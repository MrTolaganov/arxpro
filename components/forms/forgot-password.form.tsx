'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { forgotPasswordFormSchema } from '@/lib/validations'
import { ForgotPasswordFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import { getUserByEmail } from '@/actions/user.action'
import { toast } from 'sonner'
import { sendOtp } from '@/actions/otp.action'
import { useForgotPassword } from '@/hooks/use-forgot-password'

export default function ForgotPasswordForm() {
  const forgotPasswordForm = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: '' },
  })

  const [isLoading, setIsLoading] = useState(false)
  const { setEmail, setStep } = useForgotPassword()

  const onForgotPasswordFormSubmit = ({ email }: ForgotPasswordFormSchema) => {
    setIsLoading(true)

    getUserByEmail(email)
      .then(({ status, message }) => {
        if (status === 404) {
          setIsLoading(false)
          toast.error(message)
        }

        if (status === 200) {
          sendOtp(email)
            .then(({ status, message }) => {
              if (status === 200) {
                setEmail(email)
                setStep('second')
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
    <Form {...forgotPasswordForm}>
      <form
        onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordFormSubmit)}
        className='space-y-6'
      >
        <FormField
          name='email'
          control={forgotPasswordForm.control}
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
            'Send'
          )}
        </Button>
      </form>
    </Form>
  )
}
