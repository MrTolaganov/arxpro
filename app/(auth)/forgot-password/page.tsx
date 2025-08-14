import ForgotPasswordSection from '@/components/sections/forgot-password.section'
import Logo from '@/components/shared/logo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ArxPro | Forgot password',
  openGraph: {
    title: 'ArxPro | Forgot password',
  },
}

export default function ForgotPasswordPage() {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-center'>
        <Logo />
      </div>

      <div className='mt-10'>
        <ForgotPasswordSection />
      </div>
    </div>
  )
}
