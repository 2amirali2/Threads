import * as z from "zod"

export const UserValidation = z.object({
  name: z.string().min(3).max(30),
  username: z.string().min(3).max(30),
  bio: z.string().min(1).max(200),
  image: z.string(),
})

export const ThreadValidation = z.object({
  thread: z.string(),
  accountId: z.string(),
})

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters" }),
})
