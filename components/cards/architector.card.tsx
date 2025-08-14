import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'

interface ArchitectorCardProps {
  fullName: string
  profession: string
  rating: number
  image: string
  feedback: string
  index: number
}

export default function ArchitectorCard({
  fullName,
  profession,
  rating,
  image,
  feedback,
  index,
}: ArchitectorCardProps) {
  return (
    <Card className={'border-blue-1 border-2 rounded-[1rem] bg-background'}>
      <CardContent className='flex gap-8'>
        <Avatar
          className={cn(
            'size-20 border-4 bg-background',
            index % 2 === 1 ? 'border-primary' : 'border-blue-1'
          )}
        >
          <AvatarImage src={image} alt={fullName} className='object-cover' />
          <AvatarFallback className='text-4xl font-bold'>
            {fullName
              .split(' ')
              .map(item => item.at(0))
              .join('')}
          </AvatarFallback>
        </Avatar>

        <div className='flex-1 flex-col space-y-3'>
          <h3 className='text-lg font-bold text-primary'>{fullName}</h3>

          <p className='text-gray-1'>{feedback}</p>

          <div className='flex items-center justify-between'>
            <h4 className='text-base'>{profession}</h4>
            <div className='flex items-center gap-x-2'>
              <Star className='text-primary' />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
