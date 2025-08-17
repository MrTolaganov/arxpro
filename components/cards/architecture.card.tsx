import { cn } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import Image from 'next/image'
import { Map, MapPin, Star } from 'lucide-react'

interface ArchitectorCardProps {
  fullName: string
  rating: number
  description: string
  location: string
  imageSrc: string
  index: number
}

export default function ArchitectureCard({
  fullName,
  rating,
  description,
  location,
  imageSrc,
  index,
}: ArchitectorCardProps) {
  return (
    <Card className={cn('rounded-[4px] border-0', index % 2 === 1 ? 'bg-secondary' : 'bg-blue-3')}>
      <CardContent className='flex flex-col items-center gap-y-4 py-2'>
        <div className='relative size-[90px] mb-2 '>
          <Image
            src={imageSrc}
            alt={fullName}
            fill
            className={cn(
              'object-cover rounded-full border-2',
              index % 2 === 1 ? 'border-blue-3' : 'border-primary'
            )}
          />
        </div>
        <article className='flex flex-col items-center gap-y-3'>
          <CardTitle className='text-lg font-semibold'>{fullName}</CardTitle>

          <div className='flex items-center gap-x-2'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={20}
                className={cn('text-primary', index < 4 && 'fill-primary')}
              />
            ))}
            <span className='text-muted-foreground'>{rating}</span>
          </div>

          <CardDescription className='text-center line-clamp-3'>{description}</CardDescription>

          <div className='flex items-center gap-x-1 text-muted-foreground text-sm'>
            <MapPin size={14} />
            <p className=''>{location}</p>
          </div>
        </article>
      </CardContent>
    </Card>
  )
}
