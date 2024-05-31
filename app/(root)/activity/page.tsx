import { fetchUser, getActivity } from "@/lib/actions/user.action"
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const ActivityPage = async () => {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(user.id)

  if (!userInfo?.onboarded) redirect("/onboarding")

  const activity = await getActivity(userInfo._id)

  console.log(activity)
  console.log(userInfo)
  return (
    <section>
      <h1 className="text-3xl font-bold">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link href={`/thread/${activity.parentId}`} key={activity._id}>
                <article className="flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4">
                  <Image
                    src={activity.author.image}
                    alt="profile picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="text-sm">
                    <span className="text-blue-500 ml-1">
                      {activity.author.name}
                    </span>
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-xl font-semibold text-muted-foreground">No activity yet</p>
        )}
      </section>
    </section>
  )
}
export default ActivityPage
