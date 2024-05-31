import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const Topbar = () => {
  return (
    <header className="flex items-center justify-between top-0 fixed w-full bg-dark-2 px-7 py-4 z-30">
      <Link href={'/'} className="flex gap-4">
        <Image src={"/assets/logo.svg"} alt="logo" width={27} height={27} />
        <h2 className="font-semibold text-2xl">Threads</h2>
      </Link>

      {/* Logout button */}
      <SignedIn>
        <SignOutButton>
          <Image
            src={"/assets/logout.svg"}
            alt="logout"
            width={25}
            height={25}
            className="md:hidden cursor-pointer"
          />
        </SignOutButton>
      </SignedIn>
    </header>
  )
}
export default Topbar
