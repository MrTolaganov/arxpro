import LoginForm from '@/components/forms/login.form'
import Logo from '@/components/shared/logo'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ArxPro | Login',
  openGraph: {
    title: 'ArxPro | Login',
  },
}

export default function LoginPage() {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-center'>
        <Logo />
      </div>

      <div className='mt-10'>
        <LoginForm />
      </div>


    </div>
  )
}
