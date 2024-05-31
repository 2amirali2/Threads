import PostThread from "@/components/shared/PostThread"
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const CreateThreadPage = async () => {
    const user = await currentUser()

    if(!user) return;

    const userInfo = await fetchUser(user.id)

    if(!userInfo?.onboarded) redirect('/onboarding')

  return (
    <div>
    <h1 className="font-bold text-3xl">Create Thread</h1>
      <PostThread userId={userInfo._id} />
    </div>
  )
}
export default CreateThreadPage
