import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const folder = formData.get("folder") as string | null

    if (!file) {
      return NextResponse.json({ error: "لم يتم تحديد ملف" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "audio/mp3",
      "video/mp4",
      "video/webm",
      "application/pdf",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "نوع الملف غير مسموح به" }, { status: 400 })
    }

    // Max file size: 50MB
    const maxSize = 50 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ error: "حجم الملف كبير جداً (الحد الأقصى 50 ميجابايت)" }, { status: 400 })
    }

    // Create unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const fileName = `${timestamp}-${randomString}-${originalName}`

    // Determine upload folder based on file type or provided folder
    let uploadFolder = folder || "general"
    if (!folder) {
      if (file.type.startsWith("image/")) uploadFolder = "images"
      else if (file.type.startsWith("audio/")) uploadFolder = "audio"
      else if (file.type.startsWith("video/")) uploadFolder = "videos"
      else if (file.type === "application/pdf") uploadFolder = "documents"
    }

    // Create the upload directory path
    const uploadDir = path.join(process.cwd(), "public", "uploads", uploadFolder)

    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    // Return the public URL path
    const publicPath = `/uploads/${uploadFolder}/${fileName}`

    return NextResponse.json({
      success: true,
      url: publicPath,
      fileName: fileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "حدث خطأ أثناء رفع الملف" }, { status: 500 })
  }
}
