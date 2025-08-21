import { Metadata } from 'next'
import EditProfile from './_components/edit-profile'

export const metadata: Metadata = {
  title: 'ArxPro | Edit profile',
  openGraph: {
    title: 'ArxPro | Edit profile',
  },
}

export default function EditProfilePage() {
  return <EditProfile />
}
