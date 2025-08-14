import RegistrationSection from '@/components/sections/registration.section'
import Logo from '@/components/shared/logo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ArxPro | Register',
  openGraph: {
    title: 'ArxPro | Register',
  },
}

export default function RegisterPage() {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-center'>
        <Logo />
      </div>

      <div className='mt-10'>
        <RegistrationSection />
      </div>
    </div>
  )
}
