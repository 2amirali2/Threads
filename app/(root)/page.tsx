import ThreadCard from "@/components/shared/ThreadCard"
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs/server"

export default async function Home() {
  const user = await currentUser()

  if(!user) return;

  const thread = await fetchPosts()

  return (
    <>
      <h1 className="text-3xl font-bold">Home</h1>

      <section className="flex flex-col gap-10 mt-9">
        {thread.length === 0 ? (
          <p className="text-center">No Threads found</p>
        ) : (
          <>
          {thread.map((thread: any) => (
            <ThreadCard 
              key={thread._id}
              id={thread._id}
              currentUserId={user.id || ''}
              content={thread.text}
              author={thread.author}
              comments={thread.children}
              parentId={thread.parentId}
            />
          ))}
          </>
        )}
      </section>
    </>
  )
}
