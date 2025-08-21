import { Skeleton } from '../ui/skeleton'

export default function UserSkeleton() {
  return (
    <div className='flex items-center gap-x-2 cursor-pointer'>
      <Skeleton className='size-10 rounded-full' />

      <div className='flex flex-col gap-y-2 max-md:hidden'>
        <Skeleton className='h-4 w-32' />
        <Skeleton className='h-4 w-24' />
      </div>
    </div>
  )
}
