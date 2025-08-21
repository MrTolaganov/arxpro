'use client'

import { useState } from 'react'
import FavoriteProjects from './favorite-projects'
import ProfileHero from './profile-hero'
import SavedProjects from './saved-projects'
import UserInfo from './user-info'
import useCurrentUser from '@/hooks/use-current-user'
import { Loader2 } from 'lucide-react'

export default function Profile() {
  const { isLoading, currentUser } = useCurrentUser()
  return (
    <>
      {isLoading && (
        <div className='w-full h-screen flex items-center justify-center'>
          <Loader2 size={64} className='animate-spin text-primary' />
        </div>
      )}
      {!isLoading && currentUser && (
        <>
          <ProfileHero currentUser={currentUser} />
          <UserInfo currentUser={currentUser} />
          <FavoriteProjects />
          <SavedProjects />
        </>
      )}
    </>
  )
}
