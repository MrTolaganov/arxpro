import { Metadata } from 'next'
import AddProject from './components/add-project'
import { getCurrentUser } from '@/actions/user.action'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'ArxPro | Profile',
  openGraph: {
    title: 'ArxPro | Profile',
  },
}

export default async function AddProjectPage() {
  const { data: currentUser } = await getCurrentUser()

  console.log(currentUser)

  if (!currentUser || currentUser?.role === 'user') return redirect('/')

  return <AddProject />
}
