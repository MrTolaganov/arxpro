import NewsCard from '../cards/news.card'
import Section from '../shared/section'

export default function NewsSection() {
  return (
    <Section
      sectionHeaderTitle='News'
      sectionClassName='max-sm:px-4 sm:px-24'
      moreButtonLabel='More News'
      moreButtonPath='/news'
    >
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <NewsCard
            key={index}
            title='Maria Doe It is a long established fact that a reader will be distracted'
            description='Thank you for the fastest service ever, I liked how everything in the house was ready on time in the house was ready on time.'
            date='12.02.2024'
            views={325}
            image={`/images/news-${index + 1}.png`}
          />
        ))}
      </div>
    </Section>
  )
}
