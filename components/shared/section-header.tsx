import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  title: string
  description?: string
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className='flex flex-col gap-y-4 items-center'>
      <h2 className='capitalize text-3xl font-bold text-center'>{title}</h2>
      <hr className='w-12 mx-auto bg-primary h-0.5'></hr>

      {description && (
        <p className={cn('text-center md:px-24', title === 'Projects' && 'max-md:px-4 md:px-48')}>
          {description}
        </p>
      )}
    </div>
  )
}
