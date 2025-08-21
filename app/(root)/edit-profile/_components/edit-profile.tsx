'use client'

import EditProfileForm from '@/components/forms/edit-profile.form'
import useCurrentUser from '@/hooks/use-current-user'
import { Loader2 } from 'lucide-react'

export default function EditProfile() {
  const { currentUser, isLoading } = useCurrentUser()

  return (
    <div className='px-4 md:px-24 pt-24'>
      {isLoading && (
        <div className='w-full h-[calc(100vh-96px)] flex items-center justify-center'>
          <Loader2 size={64} className='text-primary animate-spin font-bold' />
        </div>
      )}
      {!isLoading && currentUser && <EditProfileForm currentUser={currentUser} />}
    </div>
  )
}
