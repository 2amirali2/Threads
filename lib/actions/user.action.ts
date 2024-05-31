"use server"

import { revalidatePath } from "next/cache"
import { connectToDB } from "../db"
import User from "../models/user.model"
import Thread from "../models/thread.model"

interface Props {
  userId: string
  username: string
  name: string
  bio: string
  image: string
  pathname: string
}

export async function updateUser({
  userId,
  username,
  bio,
  image,
  name,
  pathname,
}: Props): Promise<void> {
  connectToDB()

  try {
    await User.findOneAndUpdate(
      { id: userId },
      { username: username.toLowerCase(), image, name, bio, onboarded: true },
      { upsert: true }
    )

    if (pathname === "/profile/edit") {
      revalidatePath(pathname)
    }
  } catch (error: any) {
    throw new Error(`Failed to update user: ${error.message}`)
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId });
    
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUsers() {
    connectToDB() 

    try {
      return await User.find({})
    } catch (error: any) {
      throw new Error(`Failed to fetch users: ${error.message}`)  
    }
}

export async function getActivity(userId: string) {
  
  try {
    connectToDB()
    
    const userThreads = await Thread.find({ author: userId })

    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children)
    }, [])

    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "_id name image"
    })

    return replies
  } catch (error: any) {
    throw new Error(`Failed to fetch user activity: ${error.message}`) 
  }
}