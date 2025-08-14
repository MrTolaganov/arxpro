import { Account, Avatars, Client, Databases } from 'appwrite'

const appwriteConfig = {
  apiKey: process.env.APPWRITE_API_KEY!,
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectName: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  otpsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_OTPS_COLLECTION_ID!,
}

const client = new Client()

client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId)

const account = new Account(client)
const databases = new Databases(client)
const avatars = new Avatars(client)

export { appwriteConfig, client, account, databases, avatars }
