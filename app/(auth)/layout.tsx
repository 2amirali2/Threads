import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Auth",
  description:
    "Next.js 14 Threads app whrer you can post threads and reply to other persons threads",
  icons: {
    icon: "/assets/logo.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider afterSignInUrl={'/onboarding'} afterSignUpUrl={'/onboarding'} appearance={{
      baseTheme: dark
    }}>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="flex items-center justify-center min-h-screen">
          {children}
          </div>
          </body>
      </html>
    </ClerkProvider>
  )
}
