"use server"

import { storage, STORAGE_BUCKET_ID, ID } from "./config"

export type FileType = "image" | "audio" | "video" | "pdf"

const ALLOWED_TYPES: Record<FileType, string[]> = {
  image: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  audio: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"],
  video: ["video/mp4", "video/webm", "video/ogg"],
  pdf: ["application/pdf"],
}

const MAX_SIZES: Record<FileType, number> = {
  image: 5 * 1024 * 1024, // 5MB
  audio: 50 * 1024 * 1024, // 50MB
  video: 100 * 1024 * 1024, // 100MB
  pdf: 20 * 1024 * 1024, // 20MB
}

export async function uploadFile(file: File, fileType: FileType): Promise<string> {
  // Validate file type
  if (!ALLOWED_TYPES[fileType].includes(file.type)) {
    throw new Error(`نوع الملف غير مسموح. الأنواع المسموحة: ${ALLOWED_TYPES[fileType].join(", ")}`)
  }

  // Validate file size
  if (file.size > MAX_SIZES[fileType]) {
    throw new Error(`حجم الملف كبير جداً. الحد الأقصى: ${MAX_SIZES[fileType] / (1024 * 1024)}MB`)
  }

  const result = await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), file)

  return getFileUrl(result.$id)
}

export function getFileUrl(fileId: string): string {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${STORAGE_BUCKET_ID}/files/${fileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`
}

export async function deleteFile(fileId: string): Promise<void> {
  await storage.deleteFile(STORAGE_BUCKET_ID, fileId)
}

export function extractFileIdFromUrl(url: string): string | null {
  const match = url.match(/\/files\/([^/]+)\//)
  return match ? match[1] : null
}
