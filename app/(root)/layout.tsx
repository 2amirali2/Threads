import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Topbar from "@/components/shared/Topbar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import Bottombar from "@/components/shared/Bottombar"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Threads",
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
    <ClerkProvider afterSignInUrl={'/onboarding'} afterSignUpUrl={'/onboarding'}>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <Topbar />
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="flex min-h-screen flex-col flex-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
