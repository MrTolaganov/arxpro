import { Client, Users } from 'node-appwrite'
import { appwriteConfig } from './appwrite'

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setKey(appwriteConfig.apiKey) // must have Users write permissions

export const users = new Users(client)
