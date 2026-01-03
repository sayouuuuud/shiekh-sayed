import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { paths } = await request.json()

    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json({ error: "Invalid paths" }, { status: 400 })
    }

    // Revalidate each path
    for (const path of paths) {
      revalidatePath(path)
    }

    return NextResponse.json({
      success: true,
      message: `Revalidated ${paths.length} paths`,
      paths,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
