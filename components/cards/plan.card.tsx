import { CircleCheck } from 'lucide-react'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

interface PlanCardProps {
  type: string
  amountPerMonth: number
  amountPerYear: number
  description: string
  preferrence: string
}

export default function PlanCard({
  type,
  amountPerMonth,
  amountPerYear,
  description,
  preferrence,
}: PlanCardProps) {
  return (
    <Card className='bg-blue-3 rounded-[1rem]'>
      <CardContent className='flex flex-col items-center gap-y-8'>
        <CardTitle className='uppercase text-lg mt-4 font-semibold'>{type}</CardTitle>

        <h3 className='text-primary text-xl font-bold'>
          <span className='text-6xl font-extrabold'>
            {amountPerMonth < 10 ? `0${amountPerMonth}` : amountPerMonth}
          </span>
          .00 $/month
        </h3>
        <p className='text-lg'>
          {amountPerYear < 10 ? `0${amountPerYear.toFixed(0)}` : amountPerYear.toFixed(0)}.00 $/year
        </p>

        <CardDescription className='text-center text-base'>{description}</CardDescription>

        <div className='flex items-center justify-between border-b-2 w-full py-2'>
          <p className='text-muted-foreground'>{preferrence}</p>
          <CircleCheck size={20} className='text-primary' />
        </div>

        <Button className='text-blue-3 font-bold text-lg rounded-[8px] px-8'>Select</Button>
      </CardContent>
    </Card>
  )
}
