import NewsCard from '@/components/cards/news.card'
import { Calendar, Eye } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'ArxPro | News',
  openGraph: {
    title: 'ArxPro | News',
  },
}

export default function NewsPage() {
  return (
    <div className='pt-28 max-md:px-4 md:px-24 lg:px-24 pb-12'>
      <h2 className='capitalize text-3xl font-bold text-center'>News</h2>
      <hr className='w-12 mx-auto bg-primary h-0.5 mt-3'></hr>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>
        <div className='bg-blue-3 p-6 border border-blue-7 rounded-[8px]'>
          <h3 className='text-primary text-2xl font-bold'>
            Maria Doe It is a long established fact that a reader will be distracted
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-4'>
            <div className='h-60 w-full relative max-md:hidden'>
              <Image
                src={'/images/news-detail.png'}
                alt='News Detail 1a'
                fill
                className='object-cover rounded-[8px]'
              />
            </div>
            <div className='h-60 w-full relative'>
              <Image
                src={'/images/news-1.png'}
                alt='News Detail 1a'
                fill
                className='object-cover rounded-[8px]'
              />
            </div>
          </div>

          <div className='flex justify-between items-center mt-4'>
            <div className='flex items-center gap-x-1 text-sm'>
              <Calendar size={16} />
              <span>12.07.2025</span>
            </div>
            <div className='flex items-center gap-x-1 text-sm'>
              <Eye size={16} />
              <span>325</span>
            </div>
          </div>

          <p className='mt-4'>
            Lorem ipsum dolor sit amet consectetur. Laoreet diam ultrices tortor eget mauris.
            Consequat facilisi volutpat nisl justo a curabitur mattis nec. Est ipsum mi magna
            scelerisque id sem id elit. Euismod donec diam ullamcorper quis. Ullamcorper aliquet dui
            ultrices velit eu leo nunc. Aliquam posuere diam enim dolor pulvinar. Commodo amet magna
            urna pellentesque. Egestas amet duis neque diam aenean ipsum viverra vitae odio. Turpis
            magnis ipsum facilisi fames pharetra dictum. Consectetur vel pharetra sem pretium tempor
            sit vel malesuada. Mi morbi cursus vel facilisi. Purus enim eu pharetra mi adipiscing
            gravida. Congue nunc sed enim mi cursus massa malesuada gravida. Nascetur tristique
            purus in facilisi ullamcorper a nisl ligula. Arcu pulvinar et sapien blandit donec eget.
            Id ullamcorper placerat viverra massa leo nec tortor. Id amet sed sagittis sed sed.
            Congue arcu velit quis in quisque amet commodo. Aenean pretium hendrerit morbi euismod.
            Suspendisse tristique urna risus lectus leo. Vestibulum lobortis morbi enim cursus etiam
            commodo senectus. A facilisis aenean sed ornare malesuada donec blandit ullamcorper
            scelerisque. Mi molestie tortor tellus porttitor et porta tincidunt. Mauris urna velit
            purus risus amet amet sed. Molestie nisl suspendisse tortor dictum. Dignissim eget
            mauris blandit et. Gravida aenean quam id sem. Sed faucibus donec tortor nulla facilisi
            quis tristique nulla. Auctor augue venenatis sed consectetur amet pharetra. Eget sed
            odio sapien arcu sed neque.{' '}
          </p>
        </div>

        <div className='flex flex-col gap-y-6'>
          {Array.from({ length: 3 }).map((_, index) => (
            <NewsCard
              key={index}
              title='Maria Doe It is a long established fact that a reader will be distracted'
              description='Thank you for the fastest service ever, I liked how everything in the house was ready on time in the house was ready on time.'
              date='12.02.2024'
              views={325}
              image={`/images/news-${index + 2}.png`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
