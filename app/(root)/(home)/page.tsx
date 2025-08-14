import AboutSection from '@/components/sections/about.section'
import ArchitectorsSection from '@/components/sections/architectors.section'
import CustomersSection from '@/components/sections/customers.section'
import HeroSection from '@/components/sections/hero.section'
import NewsSection from '@/components/sections/news.section'
import ProjectsSection from '@/components/sections/projects.section'
import StatisticsSection from '@/components/sections/statistics.section'
import SubscriptionSection from '@/components/sections/subscription.section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ArxPro | Home',
  openGraph: {
    title: 'ArxPro | Home',
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CustomersSection />
      <ArchitectorsSection />
      {/* <CategoriesSection /> */}
      <SubscriptionSection />
      <NewsSection />
      <StatisticsSection />
    </>
  )
}
