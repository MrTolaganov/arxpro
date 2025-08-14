import Image from 'next/image'
import { Card, CardContent } from '../ui/card'
import { Calendar, Eye } from 'lucide-react'

interface NewsCardProps {
  image: string
  title: string
  description: string
  date: string
  views: number
}

export default function NewsCard({ title, description, date, views, image }: NewsCardProps) {
  return (
    <Card className='border-0 rounded-[1rem] bg-blue-3 py-4'>
      <CardContent className='px-4 flex max-md:flex-col md:flex-row gap-x-4'>
        <div className='relative max-md:w-full  md:w-[250px] max-md:h-[200px] md:h-full'>
          <Image src={image} alt='New Image' fill className='object-cover rounded-[1rem]' />
        </div>

        <div className='flex-1 flex-col space-y-4 py-6 px-2'>
          <div className='flex items-center justify-between text-xs'>
            <div className='flex items-center gap-x-2'>
              <Calendar />
              <span>{date}</span>
            </div>
            <div className='flex items-center gap-x-2'>
              <Eye />
              <span>{views}</span>
            </div>
          </div>

          <h4 className='text-lg text-primary font-semibold leading-6'>{title}</h4>
          <p className='text-sm'>{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
