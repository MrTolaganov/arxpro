import ArchitectureCard from '../cards/architecture.card'
import Section from '../shared/section'

export default function ArchitecturesSection() {
  return (
    <Section
      sectionHeaderTitle='Architectures'
      moreButtonLabel='More Architectures'
      moreButtonPath='/architecures'
      sectionHeaderDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    >
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5'>
        {Array.from({ length: 10 }).map((_, index) => (
          <ArchitectureCard
            key={index}
            fullName='Nozima Musaboyeva'
            location='Tashkent, Chilonzor, Fa ...'
            rating={56}
            description="Lorem Ipsum has been the industry's likely no eat  dummy text ever since the 1500s text ev eat  dummy text ever since the 1500s text ev ..."
            index={index + 1}
            imageSrc='/images/architecture.png'
          />
        ))}
      </div>
    </Section>
  )
}
