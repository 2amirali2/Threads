"use server"

import { revalidatePath } from "next/cache"
import { connectToDB } from "../db"
import Thread from "../models/thread.model"
import User from "../models/user.model"

interface Params {
  text: string
  author: string
  pathname: string
}

export async function createThread({ text, author, pathname }: Params) {
  connectToDB()

  try {
    const createThread = await Thread.create({
      text,
      author,
    })

    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    })

    revalidatePath(pathname)
  } catch (error: any) {
    throw new Error(`Failed to create thread: ${error.message}`)
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectToDB()

  try {
    const skipAmount = (pageNumber - 1) * pageSize

    const thread = await Thread.find()
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: "User",
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: "User",
          select: "_id name username image",
        },
      })

    return thread
  } catch (error: any) {
    throw new Error(`Failed to fetch threads: ${error.message}`)
  }
}

export async function fetchPostById(threadId: string) {
  connectToDB()

  try {
    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        model: "User",
        select: "_id name username image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: "User",
            select: "_id name username image",
          },
          {
            path: "children",
            model: "Thread",
            populate: {
              path: "author",
              model: "User",
              select: "_id name username image",
            },
          },
        ],
      })
      .exec()

    return thread
  } catch (error: any) {
    throw new Error(`Failed to fetch thread: ${error.message}`)
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  pathname: string
) {
  connectToDB()

  try {
    const originalThread = await Thread.findById(threadId)

    if(!originalThread) {
        throw new Error('No thread found')
    }

    const commentThread = new Thread({
        text: commentText,
        author: userId,
        parentId: threadId
    })

    const savedCommentThread = await commentThread.save()

    originalThread.children.push(savedCommentThread._id)

    await originalThread.save()

    revalidatePath(pathname)
  } catch (error: any) {
    throw new Error(`Failed to create comment: ${error.message}`)
  }
}
