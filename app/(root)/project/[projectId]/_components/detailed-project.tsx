'use client'

import { Project } from '@/types'
import SectionHeader from '@/components/shared/section-header'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import Slider from './slider'
import ProjectActions from './projects-actions'
import { useEffect, useState } from 'react'

interface DetailedProjectProps {
  project: Project | null
}

export default function DetailedProject({ project }: DetailedProjectProps) {
  const [locationData, setLocationData] = useState({ lat: 0, lon: 0 })

  useEffect(() => {
    const getLatAndLon = async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          project?.location!
        )}&format=json&limit=1`
      )

      const data = await res.json()
      const lat = data[0]?.lat
      const lon = data[0]?.lon

      setLocationData({ lat, lon })
    }

    getLatAndLon()
  }, [project?.location])

  return (
    <div className='px-4 md:px-24 pt-28'>
      <SectionHeader title={project?.name!} />

      <div className='mt-12 md:mx-12 lg:mx-24 flex flex-col md:flex-row items-start md:justify-between max-md:gap-y-4 md:items-center'>
        <div className='flex items-center gap-x-2'>
          <Avatar className='size-12'>
            <AvatarImage src={project?.author.avatar || '/images/avatar-placeholder.jpg'} />
          </Avatar>
          <div className='flex flex-col'>
            <h4 className='text-xl font-semibold'>{project?.author.fullName}</h4>
            <p className='text-muted-foreground text-lg'>{project?.author.email}</p>
          </div>
        </div>

        <div className='max-md:w-full flex items-center max-md:justify-between md:gap-x-8'>
          {project?.author?.phoneNumber && (
            <p className='text-muted-foreground'>{project?.author.phoneNumber}</p>
          )}

          <div className='flex items-center gap-x-8 max-md:ml-3'>
            {project?.author.facebook && (
              <Link href={project?.author.facebook}>
                <Image src={'/images/fb.png'} alt='' width={32} height={32} />
              </Link>
            )}
            {project?.author.telegram && (
              <Link href={project?.author.telegram}>
                <Image src={'/images/tg.webp'} alt='' width={32} height={32} />
              </Link>
            )}
            {project?.author.instagram && (
              <Link href={project?.author.instagram}>
                <Image src={'/images/ig.png'} alt='' width={32} height={32} />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className='md:mx-12 lg:mx-24 mt-6'>
        <Slider projectImages={project?.images!} />
      </div>

      <div className='mt-6 md:mx-12 lg:mx-24 flex items-center justify-between'>
        <p className='text-muted-foreground text-lg'>
          {format(new Date(project?.$createdAt!), 'MMM dd, yyyy')}
        </p>
        <h3 className='font-bold text-primary text-4xl'>${project?.price}</h3>
      </div>

      <div className='flex items-start justify-between mt-8 md:mx-12 lg:mx-24 gap-4'>
        <div className=' flex flex-wrap gap-2 flex-1'>
          {project?.tags.map(tag => (
            <Badge
              key={tag}
              variant={'outline'}
              className='uppercase border-[#006D64] rounded-[1rem] text-xs text-[#006D64]'
            >
              {tag}
            </Badge>
          ))}
        </div>
        <ProjectActions projectId={project?.$id!} />
      </div>

      <div className='mt-8 flex flex-col md:flex-row-reverse gap-6 md:mx-12 lg:mx-24'>
        <p className='text-lg flex-1 text-muted-foreground'>{project?.description}</p>
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.5985383025!2d${locationData.lon}!3d${locationData.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1756131178554!5m2!1sen!2s`}
          loading='lazy'
          className='w-full md:w-1/3 h-64 rounded-[8px]'
        ></iframe>
      </div>

      <div className='mt-8 mb-12 md:mx-12 lg:mx-24 h-64 md:h-[550px] rounded-[8px]'>
        <video controls className='size-full object-cover rounded-[8px]'>
          <source src={project?.video} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
