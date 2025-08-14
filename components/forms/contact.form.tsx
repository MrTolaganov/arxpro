'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema } from '@/lib/validations'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { ContactFormSchema } from '@/types'

export default function ContactForm() {
  const constactForm = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { firstName: '', lastName: '', email: '', message: '' },
  })

  const onContactFormSubmit = (values: ContactFormSchema) => {
    console.log('Contact Form Submitted:', values)
  }

  return (
    <Form {...constactForm}>
      <form onSubmit={constactForm.handleSubmit(onContactFormSubmit)} className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-0'>
          <FormField
            name='firstName'
            control={constactForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg mb-1'>First name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Your first name'
                    className='bg-gray-5 rounded-[8px] text-white-1 h-12 placeholder:text-white-1 selection:bg-gray-5'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='lastName'
            control={constactForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-lg mb-1'>Last name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Your last name'
                    className='bg-gray-5 rounded-[8px] text-white-1 h-12 placeholder:text-white-1'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name='email'
          control={constactForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg mb-1'>Email address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='your@gmail.com'
                  className='bg-gray-5 rounded-[8px] text-white-1 h-12 placeholder:text-white-1'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='message'
          control={constactForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-lg mb-1'>Message</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='Write something...'
                  className='bg-gray-5 rounded-[8px] text-white-1 placeholder:text-white-1 py-4'
                  rows={8}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full mt-4 rounded-[8px] h-10'>
          Send
        </Button>
      </form>
    </Form>
  )
}
