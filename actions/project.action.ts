'use server'

import { appwriteConfig, databases } from '@/lib/appwrite'
import { Project, Response, SearchParamsValues } from '@/types'
import { Query } from 'appwrite'

export async function createProject(project: Project): Promise<Response<Project | null>> {
  try {
    const userDocuments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('userId', project.author.userId)]
    )

    const user = userDocuments.documents.at(0)

    const projectDocument = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectsCollectionId,
      project.$id,
      { ...project, author: user?.$id }
    )

    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      user?.$id!,
      { projects: [...user?.projects, projectDocument.$id] }
    )

    return { status: 201, message: 'Project created successfully', data: null }
  } catch (error) {
    console.error('Error creating project:', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}

export async function getProjects({
  page,
  pageSize,
  filter,
  query,
  category,
}: SearchParamsValues): Promise<
  Response<{ projects: Project[]; isNext: boolean; totalPages: number }>
> {
  try {
    const filterQueries: string[] = []
    const offsetAmount = (page - 1) * pageSize

    // Search (needs fulltext index on "name")
    if (query) {
      filterQueries.push(Query.search('name', query))
    }

    // Sorting
    if (filter === 'latest') {
      filterQueries.push(Query.orderDesc('$createdAt'))
    }

    // Category filter (tags array)
    if (category && category !== 'all') {
      filterQueries.push(Query.contains('tags', [category]))
    }

    // Total count (⚠️ heavy on big collections)
    const totalProjectsDocuments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.projectsCollectionId,
      filterQueries
    )

    // Paged projects (fetch +1 for isNext detection)
    const projectsDocuments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.projectsCollectionId,
      [...filterQueries, Query.limit(pageSize + 1), Query.offset(offsetAmount)]
    )

    const totalProjects = totalProjectsDocuments.documents
    const projects = projectsDocuments.documents.slice(0, pageSize)
    const isNext = totalProjects.length > page * pageSize
    const totalPages = Math.ceil(totalProjects.length / pageSize)

    return {
      status: 200,
      message: 'Projects fetched successfully',
      // @ts-ignore
      data: { projects: projects as Project[], isNext, totalPages },
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return {
      status: 500,
      message: 'Something went wrong',
      data: { projects: [], isNext: false, totalPages: 1 },
    }
  }
}

export async function getProjectById(projectId: string): Promise<Response<Project | null>> {
  try {
    const projectDocument = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectsCollectionId,
      projectId
    )

    return {
      status: 200,
      message: 'Project fetched successfully',
      // @ts-ignore
      data: projectDocument as Project,
    }
  } catch (error) {
    console.error('Error fetching project by ID:', error)
    return { status: 500, message: 'Something went wrong', data: null }
  }
}
