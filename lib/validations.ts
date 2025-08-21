import z, { email } from 'zod'

export const contactFormSchema = z.object({
  firstName: z
    .string('First name is required')
    .min(3, 'First name must be at least 3 characters')
    .max(32, 'First name must be less than 32 characters'),
  lastName: z
    .string('Last name is required')
    .min(3, 'Last name must be at least 3 characters')
    .max(32, 'Last name must be less than 32 characters'),
  email: z.email('Invalid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
})

export const loginFormSchema = z.object({
  email: z.email('Invalid email address'),
  password: z
    .string('Password is required')
    .min(8, 'Password must be at least 6 characters')
    .max(32, 'Password must be less than 32 characters'),
})

export const registerFormSchema = z.object({
  fullName: z
    .string('Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(64, 'Full name must be less than 64 characters'),
  role: z.string('Role is required').min(4, 'Role is required'),
  email: z.email('Invalid email address'),
  password: z
    .string('Password is required')
    .min(8, 'Password must be at least 6 characters')
    .max(32, 'Password must be less than 32 characters'),
})

export const forgotPasswordFormSchema = z.object({
  email: z.email('Invalid email address'),
})

export const verificationFormSchema = z.object({
  code: z.string('SMS code is required').length(6, 'SMS code must be 6 characters'),
})

export const recoveryPasswordFormSchema = z
  .object({
    newPassword: z
      .string('New password is required')
      .min(8, 'New password must be at least 6 characters')
      .max(32, 'New password must be less than 32 characters'),
    confirmedPassword: z
      .string('Confirm password is required')
      .min(8, 'Confirm password must be at least 6 characters')
      .max(32, 'Confirm password must be less than 32 characters'),
  })
  .refine(data => data.newPassword === data.confirmedPassword, {
    path: ['confirmedPassword'],
    message: 'Confirm password must be equal to new password',
  })

export const editProfileFormSchema = z.object({
  fullName: z
    .string('Full name is required')
    .min(3, 'Full name must be at least 3 characters')
    .max(64, 'Full name must be less than 64 characters'),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  facebook: z.string().optional(),
  telegram: z.string().optional(),
  instagram: z.string().optional(),
})
