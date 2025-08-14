import { statistics } from '@/constants'
import { cn } from '@/lib/utils'
import Section from '../shared/section'

export default function StatisticsSection() {
  return (
    <Section
      sectionHeaderTitle='Statistics'
      sectionClassName='max-sm:px-4 sm:px-24'
      moreButtonLabel='More Statistics'
      moreButtonPath='/statistics'
      sectionHeaderDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged."
    >
      <div className='bg-secondary rounded-[1rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-14 gap-10'>
        {statistics.map(({ label, amount, percentage }) => (
          <div key={label} className=' w-full flex flex-col items-center gap-y-4'>
            <span className='relative text-4xl px-14 font-bold'>
              {percentage ? amount : `+${amount}`}
              {percentage && (
                <span
                  className={cn(
                    'absolute top-0 right-0 text-base font-normal',
                    percentage > 0 ? 'text-success' : 'text-failure'
                  )}
                >
                  {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
                </span>
              )}
            </span>

            <p className='text-lg text-center'>{label}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
