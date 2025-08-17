import { plans } from '@/constants'
import Section from '../shared/section'
import PlanCard from '../cards/plan.card'

export default function PlansSection() {
  return (
    <Section
      sectionHeaderTitle='Plans'
      sectionClassName='max-sm:px-4 sm:px-24'
      sectionHeaderDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
    >
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:px-24'>
        {plans.map(({ type, amountPerMonth, amountPerYear, preferrence, description }) => (
          <PlanCard
            key={type}
            type={type}
            amountPerMonth={amountPerMonth}
            amountPerYear={amountPerYear}
            description={description}
            preferrence={preferrence}
          />
        ))}
      </div>
    </Section>
  )
}
