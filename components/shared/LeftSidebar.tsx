"use client"

import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { redirect, usePathname } from "next/navigation"

const LeftSidebar = () => {
  const pathname = usePathname()
  const { userId } = useAuth()

  return (// sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden
          // max-md:hidden bg-dark-2 top-0 left-0 px-6 h-screen sticky overflow-auto pb-5 pt-28 w-fit flex flex-col z-20 justify-between
    <div className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-auto  pb-5 pt-28 max-md:hidden border-r border-r-dark-1 bg-dark-2">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          if (link.route === "/profile") link.route = `${link.route}/${userId}`

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn("flex items-center gap-5 p-4 rounded-lg", {
                "bg-blue-500":
                  (pathname.includes(link.route) && link.route.length > 1) ||
                  pathname === link.route,
              })}
            >
              <Image src={link.imgURL} alt="image" width={25} height={25} />
              <p className="text-base hidden lg:flex">{link.label}</p>
            </Link>
          )
        })}
      </div>

      {/* Logout button */}
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src={"/assets/logout.svg"}
                alt="logout"
                width={25}
                height={25}
                className="cursor-pointer"
              />
              <p className="text-base max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  )
}
export default LeftSidebar
