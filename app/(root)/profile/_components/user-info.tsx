'use client'

import { User } from '@/types'
import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface UserInfoProps {
  currentUser: User
}

export default function UserInfo({ currentUser }: UserInfoProps) {
  console.log(currentUser.phoneNumber)

  return (
    <div className=' md:py-6 px-4 md:px-24 mb-8'>
      <div className='flex flex-col md:flex-row items-start md:justify-between max-md:gap-y-6'>
        <div className='ml-3 md:ml-12 flex flex-col gap-y-2'>
          <h3 className='text-2xl md:text-3xl font-bold'>{currentUser?.fullName}</h3>
          <p className='text-muted-foreground text-lg md:text-xl'>{currentUser?.email}</p>
          {currentUser.address && (
            <div className='text-muted-foreground flex items-center gap-x-1'>
              <MapPin size={20} />
              <p className='text-lg line-clamp-1'>{currentUser.address}</p>
            </div>
          )}
        </div>

        <div className='flex items-center gap-x-8 max-md:ml-3'>
          {currentUser?.phoneNumber && (
            <p className='text-muted-foreground'>{currentUser.phoneNumber}</p>
          )}
          {currentUser.facebook && (
            <Link href={currentUser.facebook}>
              <Image src={'/images/fb.png'} alt='' width={32} height={32} />
            </Link>
          )}
          {currentUser.telegram && (
            <Link href={currentUser.telegram}>
              <Image src={'/images/tg.webp'} alt='' width={32} height={32} />
            </Link>
          )}
          {currentUser.instagram && (
            <Link href={currentUser.instagram}>
              <Image src={'/images/ig.png'} alt='' width={32} height={32} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
