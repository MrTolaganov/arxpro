'use server'

import { appwriteConfig, avatars, client, databases } from '@/lib/appwrite'
import { users } from '@/lib/appwrite-sdk'
import { Account, Response, User } from '@/types'
import { ID, Query } from 'appwrite'
import bcryptjs from 'bcryptjs'
import { cookies } from 'next/headers'
import { Query as QuerySDK } from 'node-appwrite'

export async function getUserByEmail(email: string): Promise<Response<User | null>> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('email', email)]
    )

    if (response.documents.length === 0)
      return { status: 404, message: 'User has not registered yet', data: null }

    const existingUser = response.documents.at(0)

    return {
      status: 200,
      message: 'User already registered via this email address',
      data: {
        fullName: existingUser?.fullName,
        email: existingUser?.email,
        userId: existingUser?.userId,
        role: existingUser?.role,
        avatar: existingUser?.avatar,
        password: existingUser?.password,
      },
    }
  } catch {
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function getCurrentUser(): Promise<Response<User | null>> {
  try {
    const cookieStore = await cookies()
    const sessionCookieName = 'current_user'
    const session = cookieStore.get(sessionCookieName)
    const userId = session?.value

    if (!userId) return { status: 401, message: 'Session value not found', data: null }

    client.headers = { ...client.headers, Cookie: `${sessionCookieName}=${session.value}` }

    const usersList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('userId', userId)]
    )

    if (usersList.total === 0) return { status: 401, message: 'User not found', data: null }

    const user = usersList.documents.at(0)

    return {
      status: 200,
      message: 'User fetched successfully',
      data: {
        fullName: user?.fullName,
        email: user?.email,
        userId: user?.userId,
        role: user?.role,
        avatar: user?.avatar,
      },
    }
  } catch {
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function recoverPassword(email: string, newPassword: string): Promise<Response<null>> {
  try {
    const usersList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('email', email)]
    )

    const user = usersList.documents.at(0)
    const hashedNewPassword = await bcryptjs.hash(newPassword, 10)
    const list = await users.list([QuerySDK.equal('email', email)])

    if (list.total === 0) return { status: 400, message: 'Account not found', data: null }

    const userId = list.users.at(0)?.$id

    await users.updatePassword(userId!, newPassword)

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user?.$id!,
      { password: hashedNewPassword }
    )

    return { status: 200, message: 'Password updated successfully', data: null }
  } catch {
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function createOAuth2User(user: Account): Promise<Response<null>> {
  try {
    const avatarUrl = avatars.getInitials(user.name)

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      { fullName: user.name, email: user.email, userId: user.$id, role: 'user', avatar: avatarUrl }
    )

    return { status: 201, message: 'OAuth2 user created successfully', data: null }
  } catch {
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function setCookie(value: string) {
  const cookieStore = await cookies()
  const sessionCookieName = 'current_user'

  cookieStore.set(sessionCookieName, value)
}

export async function deleteDuplicatedUser(userId: string): Promise<Response<null>> {
  try {
    const documentsList = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('userId', userId)]
    )

    if (documentsList.total == 2) {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        documentsList.documents.at(0)?.$id!
      )
    }
    return { status: 201, message: 'Duplicated user deleted successfully', data: null }
  } catch {
    return { status: 500, message: 'Something went wrong', data: null }
  }
}
