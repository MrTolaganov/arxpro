import { getProjects } from '@/actions/project.action'
import SectionHeader from '@/components/shared/section-header'
import { Metadata } from 'next'
import Filter from './_components/filter'
import ProjectCard from './_components/project-card'
import { getCurrentUser } from '@/actions/user.action'
import { Params } from '@/types'
import CustomPagination from '@/components/shared/custom-pagination'

export const metadata: Metadata = {
  title: 'ArxPro | Projects',
  openGraph: {
    title: 'ArxPro | Projects',
  },
}

const pageSize = 10

export default async function ProjectsPage(params: Params) {
  const searchParams = await params.searchParams
  const { data: currentUser } = await getCurrentUser()

  const {
    data: { projects, isNext, totalPages },
  } = await getProjects({
    ...searchParams,
    page: +searchParams.page! || 1,
    pageSize,
  })

  return (
    <div className='px-4 md:px-24 pt-24'>
      <SectionHeader title='Projects' />

      <Filter currentUser={currentUser} />

      {projects && projects.length > 0 && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 mt-8'>
            {projects.map((project, index) => (
              <ProjectCard key={project.$id} project={project} index={index + 1} />
            ))}
          </div>

          <CustomPagination
            page={+searchParams.page! || 1}
            isNext={isNext}
            totalPages={totalPages}
          />
        </>
      )}

      {projects && projects.length === 0 && (
        <p className='text-center mt-12 mb-24'>No project found</p>
      )}
    </div>
  )
}
