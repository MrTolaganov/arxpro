import { createOAuth2User, getCurrentUser, getUserByEmail, setCookie } from '@/actions/user.action'
import { account } from '@/lib/appwrite'
import { User } from '@/types'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchOAuth2Account = async () => {
    try {
      const user = await account.get()

      if (user.emailVerification) {
        const { data: existingUser } = await getUserByEmail(user?.email!)

        if (!existingUser) {
          await createOAuth2User(user)
        }

        await setCookie(user.$id)

        setCurrentUser({ fullName: user.name, role: 'user', email: user.email, userId: user.$id })
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCredentialsAccount = async () => {
    try {
      const { data: user } = await getCurrentUser()
      setCurrentUser(user)
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    console.log('Called');
    
    if (localStorage.getItem('oauth2_user')) {
      fetchOAuth2Account()
    } else {
      fetchCredentialsAccount()
    }
  }, [])

  return { currentUser, isLoading }
}
