'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreVertical, Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface ProjectActionProps {
  projectId: string
}

export default function ProjectActions({ projectId }: ProjectActionProps) {
  const onShareProjectLink = (projectLink: string) => {
    navigator.clipboard.writeText(projectLink).then(() => {
      toast.success('Project link copied to clipboard')
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'icon'}
          asChild
          variant={'ghost'}
          className='rounded-full p-1 hover:bg-input/50 hover:text-primary'
        >
          <MoreVertical className='text-primary rounded-full cursor-pointer' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-background'>
        <DropdownMenuItem
          className='text-white-1 focus:text-white-1 focus:bg-input/50 text-base'
          onClick={() =>
            onShareProjectLink(`${process.env.NEXT_PUBLIC_BASE_URL}/project/${projectId}`)
          }
        >
          <Share2 className='text-white-1' />
          Share
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
