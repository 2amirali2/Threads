import Image from "next/image"
import Link from "next/link"

interface Props {
  id: string
  currentUserId: string
  content: string
  parentId: string
  author: {
    name: string
    image: string
    id: string
  }
  comments: string
  isComment?: boolean
}

const ThreadCard = ({
  author,
  comments,
  parentId,
  content,
  currentUserId,
  id,
  isComment,
}: Props) => {
  return (
    <div
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex w-full flex-1 flex-row gap-4 ">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${currentUserId}`}
              className="relative h-11 w-11"
            >
              <Image
                src={author.image}
                alt="profile photo"
                fill
                className="rounded-full object-cover"
              />
            </Link>
            <div className="w-0.5 flex-1  rounded-full bg-neutral-800" />
          </div>
          <div className="flex flex-col w-full">
            <Link href={`/profile/${author.id}`}>
              <h2 className="font-bold">{author.name}</h2>
            </Link>
            <p className="text-sm my-1">{content}</p>

            <div className={`${isComment && "mb-10"} flex flex-col mt-5 gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  src={"/assets/heart-gray.svg"}
                  alt="heart"
                  width={24}
                  height={24}
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src={"/assets/reply.svg"}
                    alt="heart"
                    width={24}
                    height={24}
                  />
                </Link>
                <Image
                  src={"/assets/repost.svg"}
                  alt="heart"
                  width={24}
                  height={24}
                />
                <Image
                  src={"/assets/share.svg"}
                  alt="heart"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt="photo"
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}
          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-gray-400 text-sm">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}
    </div>
  )
}
export default ThreadCard
