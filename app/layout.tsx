import type React from "react"
import type { Metadata } from "next"
import { IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Load IBM Plex Mono font
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
})

export const metadata: Metadata = {
  title: "Sheikh Muhammad Ashik - Developer Profile",
  description: "UI/UX Designer, Developer, Blogger",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ibmPlexMono.variable} font-mono`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
