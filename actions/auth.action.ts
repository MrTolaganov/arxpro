'use server'

import { account, appwriteConfig, avatars, databases } from '@/lib/appwrite'
import { deleteCookie, setCookie } from '@/lib/cookie'
import { Response, User } from '@/types'
import { ID } from 'appwrite'
import bcryptjs from 'bcryptjs'
import { getUserByEmail } from './user.action'

export async function register(user: User): Promise<Response<User | null>> {
  try {
    const { fullName, email, role, password } = user
    const newAccount = await account.create(ID.unique(), email, password!, fullName)
    const hashedPassword = await bcryptjs.hash(password!, 10)
    const avatarUrl = avatars.getInitials(fullName)

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      { fullName, email, role, password: hashedPassword, userId: newAccount.$id, avatar: avatarUrl }
    )

    const { data: registeredUser } = await getUserByEmail(newUser?.email!)

    await setCookie('current_user', newUser?.userId!)

    return { status: 201, message: 'User registered successfully', data: registeredUser }
  } catch (error) {
    console.log('Error in register(): ', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function login(email: string, password: string): Promise<Response<User | null>> {
  try {
    const { data: user } = await getUserByEmail(email)

    if (!user) return { status: 400, message: 'User has not registered yet', data: null }

    if (!user.password)
      return { status: 400, message: 'Please set new password vie forgot password', data: null }

    const isCorrectPassword = await bcryptjs.compare(password, user.password)

    if (!isCorrectPassword) return { status: 400, message: 'Incorrect password', data: null }

    await setCookie('current_user', user?.userId!)

    return { status: 200, message: 'User logged in successfully', data: user }
  } catch (error) {
    console.log('Error in login(): ', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function logout(): Promise<Response<null>> {
  try {
    await deleteCookie('current_user')
    return { status: 200, message: 'User logged out successfully', data: null }
  } catch {
    return { status: 500, message: 'Something went wrong', data: null }
  }
}
