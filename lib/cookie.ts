'use server'

import { cookies } from 'next/headers'

export async function getCookie(name: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.get(name)
}

export async function setCookie(key: string, value: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(key, value)
}

export async function deleteCookie(key: string) {
  const cookieStore = await cookies()
  cookieStore.delete(key)
}
