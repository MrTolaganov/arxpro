import {
  addProjectFormSchema,
  contactFormSchema,
  editProfileFormSchema,
  forgotPasswordFormSchema,
  loginFormSchema,
  recoveryPasswordFormSchema,
  registerFormSchema,
  verificationFormSchema,
} from '@/lib/validations'
import { Models } from 'appwrite'
import { ReactNode } from 'react'
import z from 'zod'

interface ChildProps {
  children: ReactNode
}

type ContactFormSchema = z.infer<typeof contactFormSchema>
type LoginFormSchema = z.infer<typeof loginFormSchema>
type RegisterFormSchema = z.infer<typeof registerFormSchema>
type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>
type VerificationFormSchema = z.infer<typeof verificationFormSchema>
type RecoveryPasswordFormSchema = z.infer<typeof recoveryPasswordFormSchema>
type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>
type AddProjectFormSchema = z.infer<typeof addProjectFormSchema>

type Step = 'first' | 'second' | 'last'

type Account = Models.User<Models.Preferences>

interface Otp {
  email: string
  expiresAt: string
  otp: string
}

interface Response<T> {
  status: number
  message: string
  data: T
}

interface User {
  fullName: string
  email: string
  role: string
  userId: string
  avatar?: string
  avatarId?: string
  password?: string
  address?: string
  phoneNumber?: string
  telegram?: string
  facebook?: string
  instagram?: string
  coverImage?: string
  coverImageId?: string
}

interface File {
  fileId?: string
  url?: string
}

interface Project {
  $id: string
  name: string
  description: string
  price: number
  location: string
  images: string[]
  video: string
  tags: string[]
  author: User
  $createdAt?: string
}

export interface QueryParams {
  params: string
  key: string
  value?: string | null
}

type SearchParams = { [key: string]: string | string[] | undefined }

interface Params {
  searchParams: Promise<SearchParams>
}

interface SearchParamsValues {
  page: number
  pageSize: number
  query?: string
  filter?: string
}