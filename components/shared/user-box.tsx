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
import Link from 'next/link'
import { Edit2, LogOut, User2, User as UserIcon } from 'lucide-react'

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
        <div className='flex items-center gap-x-2 cursor-pointer'>
          <Avatar className='size-10 '>
            <AvatarImage
              src={currentUser?.avatar || '/images/avatar-placeholder.jpg'}
              alt={currentUser?.fullName}
              className='object-cover'
            />
          </Avatar>

          <div className='max-md:hidden flex flex-col uppercase text-sm font-semibold'>
            <p>{currentUser?.fullName.split(' ').at(0)}</p>
            <p>{currentUser?.fullName.split(' ').at(1)}</p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-background min-w-48'>
        <DropdownMenuItem asChild className='text-base py-2'>
          <Link href={'/profile'} className='hover:text-primary'>
            <User2 className='hover:text-primary' /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='text-base py-2'>
          <Link href={'/edit-profile'} className='hover:text-primary'>
            <Edit2 className='hover:text-primary' />
            Edit profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} asChild className='focus:text-failure text-base py-2'>
          <p className='text-failure'>
            <LogOut className='text-failure' />
            Logout
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
