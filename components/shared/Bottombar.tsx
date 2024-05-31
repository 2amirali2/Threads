"use client"

import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Bottombar = () => {
  const pathname = usePathname()

  return (
    <div className="md:hidden flex w-full fixed bottom-0 items-center justify-evenly bg-dark-2 z-20 px-7 py-4 rounded-t-3xl backdrop-blur-lg bg-glassmorphism">
      {sidebarLinks.map((link) => (
        <Link
          href={link.route}
          key={link.label}
          className={cn(
            "flex flex-col items-center px-6 py-2  gap-2 rounded-lg",
            {
              "bg-blue-500":
                pathname === link.route ||
                (pathname.includes(link.route) && link.route.length > 1),
            }
          )}
        >
          <Image src={link.imgURL} alt="image" width={25} height={25} />
          <p className="text-xs font-bold hidden sm:flex">
            {link.label.split(/\s+./)[0]}
          </p>
        </Link>
      ))}
    </div>
  )
}
export default Bottombar
