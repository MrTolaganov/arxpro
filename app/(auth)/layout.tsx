import { getCurrentUser } from '@/actions/user.action'
import { ChildProps } from '@/types'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children }: ChildProps) {
  const { data: user } = await getCurrentUser()

  if (user) return redirect('/')

  return (
    <div className='w-full h-screen relative bg-black-1'>
      <Image src={'/images/bg-hero.png'} alt='Bg Hero' fill className='object-cover opacity-25' />

      <div className='absolute top-1/2 max-md:left-0 md:left-1/2 max-md:right-0 md:-translate-x-1/2 -translate-y-1/2 flex items-center md:justify-center bg-blue-8 max-md:px-4 md:px-24 py-12 rounded-[1rem] md:min-w-2/5 backdrop-blur-sm'>
        {children}
      </div>
    </div>
  )
}
