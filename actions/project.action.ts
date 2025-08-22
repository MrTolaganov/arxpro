'use server'

import { appwriteConfig, databases } from '@/lib/appwrite'
import { Project, Response } from '@/types'
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
      project.id,
      { ...project, author: user?.$id }
    )
    console.log('Project created:', projectDocument)

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
