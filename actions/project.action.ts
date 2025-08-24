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
}: SearchParamsValues): Promise<Response<Project[] | null>> {
  try {
    const allProjectsDocuments = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.projectsCollectionId
    )

    const allProjects = allProjectsDocuments.documents

    // @ts-ignore
    return { status: 200, message: 'Projects fetched successfully', data: allProjects as Project[] }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { status: 500, message: 'Something went wrong', data: [] }
  }
}
