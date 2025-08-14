import ContactForm from '@/components/forms/contact.form'
import { Mail, MapPin, PhoneCall } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ArxPro | Contact us',
  openGraph: {
    title: 'ArxPro | Contact us',
  },
}

export default function ContactPage() {
  return (
    <div className='pt-28 max-md:px-4 md:px-24 lg:px-24 pb-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 max-md:gap-12 md:gap-0'>
        <div className='flex flex-col max-md:justify-start max-md:gap-8 md:justify-between md:py-12 md:pr-24'>
          <div className='space-y-2'>
            <h3 className='text-4xl font-bold max-md:text-center'>Contact Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima ea reiciendis debitis
              eveniet perspiciatis! Dolore repellat officia consequatur.
            </p>
          </div>

          <div className='flex flex-col gap-y-6'>
            <div className='py-4 px-6 flex items-center gap-x-3 bg-gray-5 rounded-[8px] max-md:w-full'>
              <PhoneCall />
              <p>+ 998 91 123 45 67</p>
            </div>
            <div className='py-4 px-6 flex items-center gap-x-3 bg-gray-5 rounded-[8px] max-md:w-full'>
              <Mail />
              <p>architecture@gmail.com</p>
            </div>
            <div className='py-4 px-6 flex items-center gap-x-3 bg-gray-5 rounded-[8px] max-md:w-full'>
              <MapPin />
              <p>Location 123 street 12 home</p>
            </div>
          </div>

          <div className='flex items-center gap-x-6 max-md:justify-center'>
            <Link href={'/'}>
              <Image src={'/images/fb.png'} alt='' width={32} height={32} />
            </Link>
            <Link href={'/'}>
              <Image src={'/images/ig.png'} alt='' width={32} height={32} />
            </Link>
            <Link href={'/'}>
              <Image src={'/images/tg.webp'} alt='' width={32} height={32} />
            </Link>
          </div>
        </div>

        <div className='bg-blue-6 max-md:p-6 md:p-10 rounded-[1rem] border border-white-1'>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
