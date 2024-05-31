"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import Image from "next/image"

interface Props {
  id: string
  name: string
  username: string
  imageUrl: string
}

const UserCard = ({ id, imageUrl, name, username }: Props) => {
  const router = useRouter()
  return (
    <article className="flex bg-dark-2 p-2 rounded-xl justify-between gap-4">
      <div className="flex flex-1 justify-start gap-3 xs:items-center">
        <Image
          src={imageUrl}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />

        <div className="flex-1 text-ellipsis">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </div>
      <Button
        onClick={() => router.push(`/profile/${id}`)}
        type="button"
        className="bg-blue-500 text-white h-auto min-w-[74px] rounded-lg text-[12px]"
        variant={"link"}
      >
        View
      </Button>
    </article>
  )
}
export default UserCard
