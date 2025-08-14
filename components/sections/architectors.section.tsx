import { architectors } from '@/constants'
import ArchitectorCard from '../cards/architector.card'
import Section from '../shared/section'

export default function ArchitectorsSection() {
  return (
    <Section
      sectionHeaderTitle='Our Architectors'
      sectionClassName='max-sm:px-4 sm:px-24'
      moreButtonLabel='More Architectors'
      moreButtonPath='/architectors'
      sectionHeaderDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged."
    >
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        {architectors.map(({ fullName, feedback, image, profession, rating }, index) => (
          <ArchitectorCard
            key={fullName}
            fullName={fullName}
            image={image}
            feedback={feedback}
            profession={profession}
            rating={rating}
            index={index + 1}
          />
        ))}
      </div>
    </Section>
  )
}
