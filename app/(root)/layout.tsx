import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import { ChildProps } from '@/types'

export default async function RootLayout({ children }: ChildProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
