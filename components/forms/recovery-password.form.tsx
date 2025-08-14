import { recoveryPasswordFormSchema } from '@/lib/validations'
import { RecoveryPasswordFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { recoverPassword } from '@/actions/user.action'
import { useForgotPassword } from '@/hooks/use-forgot-password'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

export default function RecoveryPasswordForm() {
  const recoveryPasswordForm = useForm<RecoveryPasswordFormSchema>({
    resolver: zodResolver(recoveryPasswordFormSchema),
    defaultValues: { newPassword: '', confirmedPassword: '' },
  })

  const [isLoading, setIsLoading] = useState(false)
  const { email } = useForgotPassword()
  const router = useRouter()

  const onRecoveryPasswordFormSubmit = ({ newPassword }: RecoveryPasswordFormSchema) => {
    setIsLoading(true)

    recoverPassword(email, newPassword)
      .then(({ status, message }) => {
        if (status === 200) {
          router.replace('/login')
          toast.success(message)
        } else {
          toast.error(message)
        }
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Form {...recoveryPasswordForm}>
      <form
        onSubmit={recoveryPasswordForm.handleSubmit(onRecoveryPasswordFormSubmit)}
        className='space-y-4'
      >
        <FormField
          name='newPassword'
          control={recoveryPasswordForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>New password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your new password'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  disabled={isLoading}
                  type='password'
                  autoComplete='new-password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='confirmedPassword'
          control={recoveryPasswordForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Confirm password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your confirm password'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  disabled={isLoading}
                  type='password'
                  autoComplete='new-password'
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
            'Submit'
          )}
        </Button>
      </form>
    </Form>
  )
}
