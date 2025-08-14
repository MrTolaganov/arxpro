import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from '@/types'
import { account } from '@/lib/appwrite'
import { logout } from '@/actions/auth.action'

interface UserBoxProps {
  currentUser: User | null
  setCurrentUser: (currentUser: User | null) => void
}

export default function UserBox({ currentUser, setCurrentUser }: UserBoxProps) {
  const onLogout = async () => {
    await account.deleteSessions()
    await logout()
    setCurrentUser(null)
    localStorage.removeItem('oauth2_user')
  }

  return (
    <Avatar className='size-10' onClick={onLogout}>
      <AvatarFallback className='bg-primary font-bold'>
        {currentUser?.fullName
          .split(' ')
          .map(item => item.at(0))
          .join('')}
      </AvatarFallback>
    </Avatar>
  )
}
