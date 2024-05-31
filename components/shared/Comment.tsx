"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CommentValidation } from "@/lib/validationSchemas"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { Input } from "../ui/input"
import { addCommentToThread } from "@/lib/actions/thread.action"

interface Props {
  threadId: string
  currentUserImage: string
  currentUserId: string
}

const Comment = ({ currentUserId, currentUserImage, threadId }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  })

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    startTransition(async () => {
      await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId), pathname)

        form.reset()
    })
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full">
              <FormLabel className="relative w-11 h-11">
                <Image
                  src={currentUserImage}
                  alt="profile photo"
                  fill
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Comment..."
                  type="text"
                  {...field}
                  className="outline-none border-none bg-dark-2 focus-visible:ring-offset-0 focus-visible:ring-0 bg-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"link"}
          className="w-fit bg-blue-500 text-white flex items-center gap-1 rounded-3xl px-8 py-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submiting
            </>
          ) : (
            <>Reply</>
          )}
        </Button>
      </form>
    </Form>
  )
}
export default Comment
