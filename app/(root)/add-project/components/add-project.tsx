'use client'

import AddProjectForm from '@/components/forms/add-project-form'
import SectionHeader from '@/components/shared/section-header'
import useCurrentUser from '@/hooks/use-current-user'
import { Loader2 } from 'lucide-react'

export default function AddProject() {
  const { isLoading, currentUser } = useCurrentUser()

  return (
    <div className='px-4 md:px-24 pt-24'>
      {isLoading && (
        <div className='w-full h-[calc(100vh-96px)] flex items-center justify-center'>
          <Loader2 size={64} className='text-primary animate-spin font-bold' />
        </div>
      )}

      {!isLoading && currentUser && (
        <div>
          <SectionHeader title='Create your project' />
          <AddProjectForm currentUser={currentUser} />
        </div>
      )}
    </div>
  )
}
