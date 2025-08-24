import { Metadata } from 'next'
import AddProject from './components/add-project'
import { getCurrentUser } from '@/actions/user.action'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'ArxPro | Add project',
  openGraph: {
    title: 'ArxPro | Add project',
  },
}

export default async function AddProjectPage() {
  const { data: currentUser } = await getCurrentUser()

  if (!currentUser || currentUser?.role === 'user') return redirect('/')

  return <AddProject />
}
