import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication via Supabase
    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Allow uploads without auth for now (can be restricted later)
    // if (!user) {
    //   return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
    // }

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = formData.get("folder") as string | null

    if (!file) {
      return NextResponse.json({ error: "الملف مطلوب", success: false }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9.-]/g, "")
    const filename = `${timestamp}-${originalName}`

    // Determine bucket based on file type
    const fileType = file.type
    let bucket = "media"

    if (fileType.startsWith("image/")) {
      bucket = "images"
    } else if (fileType.startsWith("audio/")) {
      bucket = "audio"
    } else if (fileType.startsWith("video/")) {
      bucket = "videos"
    } else if (fileType === "application/pdf") {
      bucket = "documents"
    }

    // Build the storage path
    const storagePath = folder ? `${folder}/${filename}` : filename

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from(bucket).upload(storagePath, buffer, {
      contentType: file.type,
      upsert: false,
    })

    if (error) {
      console.error("Supabase storage error:", error)
      // If bucket doesn't exist, try the default 'media' bucket
      const { data: fallbackData, error: fallbackError } = await supabase.storage
        .from("media")
        .upload(storagePath, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (fallbackError) {
        return NextResponse.json(
          {
            error: "فشل رفع الملف: " + fallbackError.message,
            success: false,
          },
          { status: 500 },
        )
      }

      // Get public URL from fallback bucket
      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(storagePath)

      return NextResponse.json({
        success: true,
        path: publicUrl,
        url: publicUrl,
      })
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(storagePath)

    return NextResponse.json({
      success: true,
      path: publicUrl,
      url: publicUrl,
    })
  } catch (error) {
    console.error("Upload error:", error)
    const message = error instanceof Error ? error.message : "حدث خطأ في رفع الملف"
    return NextResponse.json({ error: message, success: false }, { status: 500 })
  }
}
