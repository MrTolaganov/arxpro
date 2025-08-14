import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { User } from '@/types'
import { account } from '@/lib/appwrite'
import { logout } from '@/actions/auth.action'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useRouter } from 'next/navigation'

interface UserBoxProps {
  currentUser: User | null
}

export default function UserBox({ currentUser }: UserBoxProps) {
  const router = useRouter()

  const onLogout = async () => {
    await account.deleteSessions()
    await logout()
    router.replace('/login')
    localStorage.removeItem('oauth2_user')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='size-10 cursor-pointer'>
          <AvatarFallback className='bg-primary font-bold'>
            {currentUser?.fullName
              .split(' ')
              .map(item => item.at(0))
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-blue-3'>
        <DropdownMenuItem className='cursor-text'>
          <div className='flex flex-col'>
            <h3 className='text-primary text-lg'>{currentUser?.fullName}</h3>
            <p className='hover:text-muted-foreground text-muted-foreground text-base'>
              {currentUser?.email}
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <p className='text-center text-failure mx-auto'>Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
