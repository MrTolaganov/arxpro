import SectionHeader from '@/components/shared/section-header'
import { aboutPageCategories, aboutUsPageImages } from '@/constants'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'ArxPro | About us',
  openGraph: {
    title: 'ArxPro | About us',
  },
}

export default function AboutPage() {
  return (
    <div className='pt-32 max-md:px-4 md:px-24 pb-12'>
      <SectionHeader
        title='About Us'
        description='Arxpro is a leading online platform designed to connect architects and clients, providing a seamless space for collaboration, creativity, and project management. Our mission is to simplify the architectural process, making it easier for clients to find and work with talented architects who meet their project needs. Online platform designed to connect architects and clients, providing a seamless space for collaboration, creativity, and project management. Our mission is to simplify the architectural process, making it easier for clients to find and work with talented architects who meet their project needs.'
      />

      <div className='lg:px-24'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-8'>
          {aboutUsPageImages.map(image => (
            <div key={image} className='w-full h-60 relative'>
              <Image key={image} src={image} alt='Image' fill className='rounded-[8px]' />
            </div>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-12'>
          <div className='p-6 space-y-4 bg-blue-2 rounded-[8px]'>
            <h3 className='text-2xl font-bold'>Free Demo Version</h3>
            <p>
              Our mission is to deliver top-notch IT services that enhance efficiency, foster
              growth, and enable our clients to achieve their business goals. We strive to create
              value through innovative solutions.
            </p>
          </div>
          <div className='p-6 space-y-4 bg-orange-2 rounded-[8px]'>
            <h3 className='text-2xl font-bold'>Usefull to find customers</h3>
            <p>
              We envision a future where technology seamlessly integrates with every aspect of
              business, unlocking new possibilities and driving global progress. Our goal is to be
              at the forefront of this transformation.
            </p>
          </div>
        </div>

        <div className='mt-12'>
          <h2 className='text-4xl font-bold'>What We Do</h2>
          <p className='mt-3'>
            At ArxPro platform, we specialize in a wide range of IT services, including
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
            {aboutPageCategories.map(({ title, description }) => (
              <div key={title} className='p-4 rounded-[8px] bg-gray-4 space-y-2'>
                <h4 className='text-xl font-semibold'>{title}</h4>
                <p className='text-gray-300'>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
