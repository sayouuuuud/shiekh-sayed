"use server"

import { Client, Account } from "node-appwrite"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface AuthUser {
  $id: string
  email: string
  name: string
}

export interface LoginResult {
  success: boolean
  error?: string
}

export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("[LOGIN] ======== LOGIN ATTEMPT STARTED ========")
  console.log("[LOGIN] Email:", email)
  console.log("[LOGIN] Password length:", password?.length)
  console.log("[LOGIN] Endpoint:", process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  console.log("[LOGIN] Project ID:", process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

  if (!email || !password) {
    console.log("[LOGIN] ❌ Missing email or password")
    return { success: false, error: "البريد الإلكتروني وكلمة المرور مطلوبان" }
  }

  if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    console.log("[LOGIN] ❌ Missing Appwrite environment variables")
    return { success: false, error: "إعدادات Appwrite غير مكتملة" }
  }

  try {
    console.log("[LOGIN] Creating Appwrite client...")
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

    console.log("[LOGIN] Client created, creating Account instance...")
    const account = new Account(client)

    console.log("[LOGIN] Calling createEmailPasswordSession...")
    const session = await account.createEmailPasswordSession(email, password)
    console.log("[LOGIN] ✅ Session created successfully!")
    console.log("[LOGIN] Session ID:", session.$id)
    console.log("[LOGIN] Session Secret:", session.secret ? "SET" : "NOT SET")

    const cookieStore = await cookies()
    console.log("[LOGIN] Setting cookie...")
    cookieStore.set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
    console.log("[LOGIN] ✅ Cookie set successfully!")
    console.log("[LOGIN] ======== LOGIN SUCCESS, REDIRECTING ========")

    redirect("/admin")
  } catch (error: unknown) {
    console.error("[LOGIN] ❌ ======== ERROR OCCURRED ========")
    console.error("[LOGIN] Error object:", error)

    if (error instanceof Error) {
      console.error("[LOGIN] Error message:", error.message)
      console.error("[LOGIN] Error name:", error.name)

      if (error.message.includes("NEXT_REDIRECT")) {
        console.log("[LOGIN] NEXT_REDIRECT detected, re-throwing...")
        throw error
      }
    }

    let errorMessage = "فشل تسجيل الدخول"

    if (error instanceof Error) {
      const msg = error.message.toLowerCase()
      console.log("[LOGIN] Error message to parse:", msg)

      if (msg.includes("invalid") || msg.includes("credentials") || msg.includes("401")) {
        errorMessage = "بيانات الدخول غير صحيحة"
      } else if (msg.includes("not found") || msg.includes("user")) {
        errorMessage = "المستخدم غير موجود"
      } else if (msg.includes("rate") || msg.includes("too many")) {
        errorMessage = "محاولات كثيرة، يرجى الانتظار قليلاً"
      } else {
        errorMessage = error.message
      }
    }

    console.error("[LOGIN] Returning error:", errorMessage)
    return { success: false, error: errorMessage }
  }
}

export async function logout(): Promise<void> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("appwrite-session")

    if (session) {
      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setSession(session.value)

      const account = new Account(client)
      await account.deleteSession("current")
    }

    cookieStore.delete("appwrite-session")
  } catch (error) {
    console.error("[v0] Logout error:", error)
    // Still delete the cookie even if Appwrite session deletion fails
    const cookieStore = await cookies()
    cookieStore.delete("appwrite-session")
  }

  redirect("/login")
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("appwrite-session")

    if (!session) {
      return null
    }

    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
      .setSession(session.value)

    const account = new Account(client)
    const user = await account.get()

    return {
      $id: user.$id,
      email: user.email,
      name: user.name,
    }
  } catch (error) {
    console.error("[v0] Get current user error:", error)
    return null
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}
