'use client'

import { registerFormSchema } from '@/lib/validations'
import { RegisterFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Link from 'next/link'
import { useState } from 'react'
import { getUserByEmail } from '@/actions/user.action'
import { toast } from 'sonner'
import { sendOtp } from '@/actions/otp.action'
import { ID } from 'appwrite'
import { Loader } from 'lucide-react'
import { useUserDetails } from '@/hooks/use-user-details'
import { FcGoogle } from 'react-icons/fc'

interface RegisterFormProps {
  setIsVerifying: (isVerifying: boolean) => void
}

export default function RegisterForm({ setIsVerifying }: RegisterFormProps) {
  const registerFrom = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { fullName: '', role: '', email: '', password: '' },
  })

  const { setUserDetails } = useUserDetails()
  const [isLoading, setIsLoading] = useState(false)

  const onRegisterFormSubmit = (values: RegisterFormSchema) => {
    const { fullName, email, role, password } = values

    setIsLoading(true)

    getUserByEmail(email)
      .then(({ status, message }) => {
        if (status === 200) {
          setIsLoading(false)
          toast.error(message)
        }

        if (status === 404) {
          sendOtp(email)
            .then(({ status, message }) => {
              if (status === 200) {
                setIsVerifying(true)

                setUserDetails({
                  userId: ID.unique(),
                  fullName,
                  email,
                  role,
                  password,
                })
                toast.success(message)
              } else {
                toast.error(message)
              }
            })
            .catch((err: any) => {
              toast.error(`Error sending verification code: ${err}`)
            })
            .finally(() => {
              setIsLoading(false)
            })
        }
      })
      .catch(err => {
        setIsLoading(false)
        console.error('Error fetching user by email:', err)
      })
  }

  return (
    <Form {...registerFrom}>
      <form onSubmit={registerFrom.handleSubmit(onRegisterFormSubmit)} className='space-y-4'>
        <FormField
          name='fullName'
          control={registerFrom.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Full name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your full name'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='email'
          control={registerFrom.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your email address'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  disabled={isLoading}
                  type='email'
                  autoComplete='email'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='role'
          control={registerFrom.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Full name</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className='w-full rounded-[8px]'>
                    <SelectValue placeholder='Select your role' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='user' className='font-bold'>
                    User
                  </SelectItem>
                  <SelectItem value='architector' className='font-bold'>
                    Architector
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          control={registerFrom.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your password'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  type='password'
                  autoComplete='new-password'
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='mt-2 w-full bg-primary text-white-1 rounded-[8px] h-10'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className='animate-spin' /> Loading...
            </>
          ) : (
            'Register'
          )}
        </Button>

        <Button
          type='button'
          variant={'outline'}
          className='mt-2 w-full bg-transparent hover:bg-transparent h-10 rounded-[8px]'
          disabled={isLoading}
        >
          <FcGoogle />
          Continue with Google
        </Button>

        <div className='flex justify-center items-center gap-x-2 mt-2'>
          <p>Already have an account?</p>
          <Link href={'/login'} className='text-primary font-semibold'>
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}
