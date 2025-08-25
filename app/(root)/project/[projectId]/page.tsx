import { getProjectById } from '@/actions/project.action'
import { Metadata } from 'next'
import ProjectLocation from './_components/project-location'
import ProjectActions from './_components/projects-actions'
import { Badge } from '@/components/ui/badge'
import SectionHeader from '@/components/shared/section-header'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AuthorSocials from './_components/author.socials'
import Slider from './_components/slider'
import { format } from 'date-fns'

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

  return (
    <div className='px-4 md:px-24 pt-28'>
      <SectionHeader title={project?.name!} />

      <div className='mt-12 md:mx-12 lg:mx-24 flex flex-col md:flex-row items-start md:justify-between max-md:gap-y-4 md:items-center'>
        <div className='flex items-center gap-x-2'>
          <Avatar className='size-12'>
            <AvatarImage src={project?.author.avatar || '/images/avatar-placeholder.jpg'} />
          </Avatar>
          <div className='flex flex-col'>
            <h4 className='text-xl font-semibold'>{project?.author.fullName}</h4>
            <p className='text-muted-foreground text-lg'>{project?.author.email}</p>
          </div>
        </div>

        <div className='max-md:w-full flex items-center max-md:justify-between md:gap-x-8'>
          {project?.author?.phoneNumber && (
            <p className='text-muted-foreground'>{project?.author.phoneNumber}</p>
          )}

          <AuthorSocials author={project?.author ?? null} />
        </div>
      </div>

      <div className='md:mx-12 lg:mx-24 mt-6'>
        <Slider projectImages={project?.images!} />
      </div>

      <div className='mt-6 md:mx-12 lg:mx-24 flex items-center justify-between'>
        <p className='text-muted-foreground text-lg'>
          {format(new Date(project?.$createdAt!), 'MMM dd, yyyy')}
        </p>
        <h3 className='font-bold text-primary text-4xl'>${project?.price}</h3>
      </div>

      <div className='flex items-start justify-between mt-8 md:mx-12 lg:mx-24 gap-4'>
        <div className=' flex flex-wrap gap-2 flex-1'>
          {project?.tags.map(tag => (
            <Badge
              key={tag}
              variant={'outline'}
              className='uppercase border-[#006D64] rounded-[1rem] text-xs text-[#006D64]'
            >
              {tag}
            </Badge>
          ))}
        </div>
        <ProjectActions projectId={project?.$id!} />
      </div>

      <div className='mt-8 flex flex-col md:flex-row-reverse gap-6 md:mx-12 lg:mx-24'>
        <p className='text-lg flex-1 text-muted-foreground'>{project?.description}</p>
        <ProjectLocation location={project?.location!} />
      </div>

      <div className='mt-8 mb-12 md:mx-12 lg:mx-24 h-64 md:h-[550px] rounded-[8px]'>
        <video controls className='size-full object-cover rounded-[8px]'>
          <source src={project?.video} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
