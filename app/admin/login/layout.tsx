import type React from "react"

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // Login page is standalone - no sidebar/header
  return <>{children}</>
}
