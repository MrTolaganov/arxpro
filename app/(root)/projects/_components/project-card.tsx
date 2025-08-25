'use client'

import { Project } from '@/types'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { Bookmark, MapPin, Share2, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.$id}`}>
      <Card
        className={cn(
          'rounded-[4px] border-0 py-4 h-[300px]',
          index % 2 === 1 ? 'bg-orange-3' : 'bg-[#2426491A]'
        )}
      >
        <CardContent className='px-4 space-y-6 flex flex-col items-center h-full'>
          <CardTitle className='w-full text-center line-clamp-1'>{project.name}</CardTitle>

          <div className='size-24 relative'>
            <Image
              src={project.images.at(0)!}
              alt={project.name}
              fill
              className={cn(
                'object-cover rounded-full border-2',
                index % 2 === 1 ? 'border-blue-3' : 'border-primary'
              )}
            />
          </div>

          <div className='flex flex-col justify-between flex-1 w-full'>
            <div className='w-full flex justify-between items-center'>
              <div className='flex items-center gap-x-2'>
                <MapPin size={20} className='text-primary' />
                <p className='text-gray-3 text-sm'>{project.location}</p>
              </div>
              <h3 className='text-primary font-semibold text-base'>${project.price}</h3>
            </div>

            <p className='w-full line-clamp-2 text-sm text-gray-3'>{project.description}</p>

            <div className='w-full flex items-center justify-between'>
              <Badge
                variant={'outline'}
                className='uppercase border-[#006D64] rounded-[1rem] text-[10px] text-[#006D64]'
              >
                {project.tags.at(0)}
              </Badge>
              <div className='flex items-center gap-x-1'>
                <Star size={16} className={'text-primary'} />
                <span className='text-gray-3 text-sm'>{24}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
