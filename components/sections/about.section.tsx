import Image from 'next/image'
import SectionHeader from '../shared/section-header'
import MoreButton from '../shared/more-button'

export default function AboutSection() {
  return (
    <section className='flex justify-center flex-col max-sm:px-4 sm:px-24 py-16 gap-y-16 max-sm:pb-24'>
      <SectionHeader
        title='About us'
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting, remaining essentially
          unchanged."
      />

      <div className='relative max-sm:h-[560px] sm:h-[640px] w-full'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:w-[calc(100%-64px)] sm:w-[calc(100%-374px)] max-sm:h-[calc(100%-64px)] sm:h-[calc(100%-187px)]'>
          <Image src={'/images/about-hero.png'} alt='About Hero' fill className='object-cover' />
        </div>

        <div className='absolute max-sm:w-28 max-sm:h-[280px] max-sm:top-4 sm:top-12 max-sm:right-3 sm:right-[140px] sm:left-[388px] max-sm:bottom-4 sm:bottom-52 border-t-2 border-r-2 border-white-1'></div>

        <article className='absolute top-0 left-0 p-8 bg-blue-2 max-sm:max-w-2/3 sm:max-w-[374px] space-y-4'>
          <h4 className='text-2xl font-semibold'>Free Demo Version</h4>
          <p className='text-sm'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever.
          </p>
        </article>

        <article className='absolute bottom-0 right-0 max-sm:max-w-2/3 sm:max-w-[374px] p-8 space-y-4  bg-primary-foreground'>
          <h4 className='text-2xl font-semibold'>Usefull to find customers</h4>
          <p className='text-sm'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever.
          </p>
        </article>

        <MoreButton
          label='More About Us'
          path='/about'
          className='absolute max-sm:left-1/2 max-sm:-translate-x-1/2 sm:left-[185px] max-sm:-bottom-16 sm:bottom-8'
        />
      </div>
    </section>
  )
}
