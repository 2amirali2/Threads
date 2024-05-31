import UserCard from "@/components/shared/UserCard"
import { fetchUser, fetchUsers } from "@/lib/actions/user.action"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Search = async () => {
  const user = await currentUser()

  if (!user) return null

  const userInfo = await fetchUser(user.id)

  if (!userInfo?.onboarded) redirect("/onboarding")

  const users = await fetchUsers()
  return (
    <section>
      <h1 className="text-3xl font-bold">Search</h1>

      <div className="flex flex-col mt-14 gap-9">
        {users.map((user) => (
          <UserCard
            key={user._id}
            id={user.id}
            imageUrl={user.image}
            name={user.name}
            username={user.username}
          />
        ))}
      </div>
    </section>
  )
}
export default Search
