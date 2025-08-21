import { Metadata } from 'next'

import Profile from './_components/profile'

export const metadata: Metadata = {
  title: 'ArxPro | Profile',
  openGraph: {
    title: 'ArxPro | Profile',
  },
}

export default function ProfilePage() {
  return <Profile />
}
