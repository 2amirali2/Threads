import AccountProfile from "@/components/shared/AccountProfile"
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  const user = await currentUser()

  if(!user) return null;
  
  const userInfo = await fetchUser(user.id)
  if(userInfo?.onboarded) redirect('/');

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username ? userInfo?.username : user?.username || '',
    name: userInfo?.name ? userInfo?.name : user?.firstName || '',
    image: userInfo?.image ? userInfo?.image : user?.imageUrl || '',
    bio: userInfo ? userInfo?.bio : '',
  }
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 w-full">
      <h1 className="font-bold text-xl">Onboarding</h1>
      <p className="mt-3 text-base"> Complete your profile now to use Threads</p>


      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} />
      </section>
    </main>
  )
}
export default OnboardingPage
