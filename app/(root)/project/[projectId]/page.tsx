import { getProjectById } from '@/actions/project.action'
import { Metadata } from 'next'
import DetailedProject from './_components/detailed-project'

interface RouteParams {
  params: Promise<{ projectId: string }>
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { projectId } = await params
  const { data: project } = await getProjectById(projectId)

  return {
    title: `ArxPro | ${project?.name}`,
    description: project?.description,
    openGraph: {
      images: project?.images.at(0),
      title: `ArxPro | ${project?.name}`,
      description: project?.description,
    },
  }
}

export default async function ProjectPage({ params }: RouteParams) {
  const { projectId } = await params
  const { data: project } = await getProjectById(projectId)

  return <DetailedProject project={project} />
}
