'use client'

import { footerMenuItems, socialLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-blue-5 max-sm:px-4 sm:px-24 max-sm:py-8 sm:py-16 flex max-md:flex-col md:flex-row max-md:justify-start md:justify-between max-md:gap-4 md:gap-12'>
      <div className='md:w-1/3'>
        <div className='w-[200px] h-[125px] bg-background border rounded-[8px] relative max-sm:mx-auto'>
          <Link href={'/'} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Image src={'/images/logo.png'} alt='Logo' width={150} height={150} />
          </Link>
        </div>

        <div className='flex items-center font-bold text-2xl mt-6 max-md:justify-center'>
          <span className='text-primary'>Arx</span>
          <span className='text-white-1'>Pro</span>
        </div>

        <p className='mt-8 text-gray-3 max-md:text-center'>
          Thank you for the fastest service ever, I liked how everything in the house was ready on
          time in the house was ready on time.
        </p>
      </div>

      <div className='md:border-l-2 md:border-background max-md:px-4 md:px-8 flex-1'>
        <h4 className='text-lg font-semibold max-md:hidden'>Menu</h4>

        <div className='grid grid-cols-2 mt-12 gap-x-8'>
          {footerMenuItems.map(({ label, path }) => (
            <Link key={label} href={path} className='text-sm mb-4'>
              {label}
            </Link>
          ))}

          <Link href={'/'} className='text-sm mt-12 text-gray-3'>
            DOCUMENTATION
          </Link>
          <Link href={'/'} className='text-sm mt-12 text-gray-3'>
            PRIVACY & COOKIE POLICY
          </Link>
        </div>
      </div>

      <div>
        <h4 className='text-lg font-semibold max-md:hidden'>Social media</h4>

        <div className='flex max-md:flex-row md:flex-col max-md:gap-3 md:gap-4 mt-12'>
          {socialLinks.map(({ name, path }) => (
            <Link key={name} href={path} className='text-sm'>
              {name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
