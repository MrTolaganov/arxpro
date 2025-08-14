'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { LoginFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema } from '@/lib/validations'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { login } from '@/actions/auth.action'
import { account, appwriteConfig, databases } from '@/lib/appwrite'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { ID, OAuthProvider, Query } from 'appwrite'

export default function LoginForm() {
  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '' },
  })

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onLoginFormSubmit = ({ email, password }: LoginFormSchema) => {
    setIsLoading(true)

    login(email, password)
      .then(({ status, message }) => {
        if (status === 200) {
          account
            .createEmailPasswordSession(email, password)
            .then(() => {
              toast.success(message)
              router.replace('/')
            })
            .catch(err => {
              console.log(err)
              toast.error('Error during creating session')
            })
        } else {
          toast.error(message)
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onContinueWithGoogle = async () => {
    try {
      setIsLoading(true)
      account.createOAuth2Session(
        OAuthProvider.Google,
        process.env.NEXT_PUBLIC_BASE_URL,
        `${process.env.NEXT_PUBLIC_BASE_URL}/login`
      )

      localStorage.setItem('oauth2_user', ID.unique())
    } catch (err) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLoginFormSubmit)} className='space-y-4'>
        <FormField
          name='email'
          control={loginForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your phone email address'
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
          name='password'
          control={loginForm.control}
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center justify-between mb-1'>
                <FormLabel className='text-base'>Password</FormLabel>
                <Link href={'/forgot-password'} className='text-primary text-base font-semibold'>
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your password'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  disabled={isLoading}
                  type='password'
                  autoComplete='current-password'
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
            'Login'
          )}
        </Button>

        <Button
          type='button'
          variant={'outline'}
          className='mt-2 w-full bg-transparent hover:bg-transparent h-10 rounded-[8px]'
          disabled={isLoading}
          onClick={onContinueWithGoogle}
        >
          <FcGoogle />
          Continue with Google
        </Button>

        <div className='flex justify-center items-center gap-x-2 mt-2'>
          <p>Don&apos;t have an account yet?</p>
          <Link href={'/register'} className='text-primary font-semibold'>
            Register
          </Link>
        </div>
      </form>
    </Form>
  )
}
