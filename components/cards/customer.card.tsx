import Image from 'next/image'
import { Card, CardContent } from '../ui/card'

interface CustomerCardProps {
  fullName: string
  profession: string
  comment: string
}

export default function CustomerCard({ fullName, profession, comment }: CustomerCardProps) {
  return (
    <Card className='bg-secondary border-0'>
      <CardContent className='space-y-4'>
        <Image src={'/images/double-quote.png'} alt='Double quote' width={40} height={40} />
        <article>
          <h3 className='text-lg font-semibold'>{fullName}</h3>
          <p className='text-sm text-gray-2'>{profession}</p>
        </article>
        <p>{comment}</p>
      </CardContent>
    </Card>
  )
}
