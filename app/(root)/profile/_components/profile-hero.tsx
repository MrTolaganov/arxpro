'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/types'
import Image from 'next/image'

interface ProfileHeroProps {
  currentUser: User
}

export default function ProfileHero({ currentUser }: ProfileHeroProps) {
  return (
    <div className='px-4 md:px-24 pt-24 mb-14 md:mb-24'>
      <div className='relative w-full h-40 md:h-60 rounded-[1rem]'>
        <Image
          src={currentUser?.coverImage || '/images/cover-placeholder.png'}
          alt='Profile placeholder'
          fill
          className='object-cover rounded-[1rem]'
        />

        <div className='absolute left-6 md:left-24 -bottom-10 md:-bottom-20'>
          <Avatar className='size-20 md:size-40'>
            <AvatarImage
              src={currentUser?.avatar || '/images/avatar-placeholder.jpg'}
              alt={currentUser?.fullName}
              className='object-cover'
            />
          </Avatar>
        </div>
      </div>
    </div>
  )
}
