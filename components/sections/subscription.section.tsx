'use client'

import { useRef } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import Section from '../shared/section'

export default function SubscriptionSection() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Section
      sectionHeaderTitle='Subscribe for more News and features'
      sectionClassName='bg-black-1 max-sm:px-4 sm:px-24'
      sectionHeaderDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book."
    >
      <div className='w-full sm:w-[500px] relative mx-auto max-sm:px-4'>
        <Input
          placeholder='Enter your email'
          className='inset-0 rounded-2xl text-sm bg-blue-3 border-0'
          ref={inputRef}
        />
        <Button
          className='absolute right-0 top-0 rounded-2xl max-sm:px-6 sm:px-12 uppercase text-blue-3 font-bold bg-gradient-to-r from-orange-1 to-primary'
          onClick={() => inputRef.current?.focus()}
        >
          Subscribe
        </Button>
      </div>
    </Section>
  )
}
