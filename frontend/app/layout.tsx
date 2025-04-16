import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Course Management Platform",
  description: "Manage students, courses, and assignments",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col">
            <header className="border-b">
              <div className="container mx-auto flex h-16 items-center px-4">
                <div className="mr-8 font-bold text-xl">
                  <a href="/">SW</a>
                </div>
                <nav className="flex items-center space-x-2">
                  <a href="/" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-accent">
                    Home
                  </a>
                  <a
                    href="/students"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    Students
                  </a>
                  <a
                    href="/courses"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    Courses
                  </a>
                  <a
                    href="/assignments"
                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    Assignments
                  </a>
                </nav>
              </div>
            </header>
            <main className="flex-1 container mx-auto py-8 px-4">{children}</main>
            <footer className="border-t py-4">
              <div className="container mx-auto text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} all rights reserved for SW Consulting 
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
