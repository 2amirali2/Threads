"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ThreadValidation } from "@/lib/validationSchemas"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import { createThread } from "@/lib/actions/thread.action"

interface Props {
  userId: string
}

const PostThread = ({ userId }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  })

  async function onSubmit(values: z.infer<typeof ThreadValidation>) {
    startTransition(async () => {
      await createThread({ text: values.thread, author: userId, pathname })

      router.push('/')
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-10 gap-4">
              <FormLabel className="">Content</FormLabel>
              <FormControl>
                <Textarea
                  rows={20}
                  {...field}
                  className="outline-none border-none bg-dark-2 focus-visible:ring-offset-0 focus-visible:ring-0 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"link"}
          className="w-full bg-blue-500 text-white flex items-center gap-1"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submiting
            </>
          ) : (
            <>Post Thread</>
          )}
        </Button>
      </form>
    </Form>
  )
}
export default PostThread
