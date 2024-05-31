import { fetchUser } from "@/lib/actions/user.action"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"

const ProfilePage = async () => {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(user.id)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24">
          <Image
            src={userInfo.image}
            alt="profile photo"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
            <h2 className="text-2xl font-bold">{userInfo.name}</h2>
            <p className="text-base text-gray-400">@{userInfo.username}</p>
        </div>
      </div>
      <div className="my-6">
        <p>{userInfo.bio}</p>
      </div>

      <div className="w-full border-b-2 border-gray-900" />

      
    </div>
  )
}
export default ProfilePage
