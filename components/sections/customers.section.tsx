import CustomerCard from '../cards/customer.card'
import Section from '../shared/section'

export default function CustomersSection() {
  return (
    <Section
      sectionHeaderTitle='Happy Customer'
      sectionClassName='bg-black-1 max-sm:px-4 sm:px-24'
      moreButtonLabel='More Testimonials'
      moreButtonPath='/customers'
      moreButtonClassName='bg-black-1'
      sectionHeaderDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged."
    >
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
        {Array.from({ length: 4 }).map((_, index) => (
          <CustomerCard
            key={index}
            fullName='John Doe'
            profession='SEO Optimizer'
            comment="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
          />
        ))}
      </div>
    </Section>
  )
}
