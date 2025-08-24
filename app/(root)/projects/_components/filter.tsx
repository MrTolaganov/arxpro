'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChangeEvent, useCallback, useRef } from 'react'
import { addUrlQuery, removeUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce } from 'lodash'
import { User } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { projectTags } from '@/constants'

interface FilterProps {
  currentUser: User | null
}

export default function Filter({ currentUser }: FilterProps) {
  const searchParams = useSearchParams()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  const onInputChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim()
    let newUrlQuery = ''

    newUrlQuery = addUrlQuery({ params: searchParams.toString(), key: 'query', value: inputValue })

    if (!inputValue) {
      newUrlQuery = removeUrlQuery({ params: searchParams.toString(), key: 'query' })
    }

    router.push(newUrlQuery)
  }

  const onSelectChangeUrl = (key: string, selectValue: string) => {
    const newUrlQuery = addUrlQuery({
      params: searchParams.toString(),
      key,
      value: selectValue,
    })
    router.push(newUrlQuery)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDebounceChangeUrl = useCallback(debounce(onInputChangeUrl, 300), [])

  return (
    <div className='flex flex-col md:flex-row gap-2 max-md:w-full mt-8 md:justify-between'>
      <div className='flex flex-col md:flex-row gap-2 max-md:w-full '>
        <div className={'flex items-center bg-background'}>
          <Input
            ref={inputRef}
            placeholder={'Search...'}
            className={'min-w-64 h-10 border-r-0'}
            onChange={onDebounceChangeUrl}
          />
          <Search
            size={40}
            onClick={() => inputRef.current?.focus()}
            className={'cursor-pointer text-muted-foreground border border-l-0 border-input p-2'}
          />
        </div>

        <div className='flex items-center gap-2'>
          <Select
            defaultValue={'latest'}
            onValueChange={selectValue => onSelectChangeUrl('filter', selectValue)}
          >
            <SelectTrigger className={'w-1/2 md:w-48'}>
              <SelectValue placeholder={'Filter'} className={'text-muted-foreground'} />
            </SelectTrigger>
            <SelectContent className={'m-0 bg-background'}>
              <SelectItem value={'latest'}>Latest</SelectItem>
              <SelectItem value={'most-starred'}>Most starred</SelectItem>
              <SelectItem value={'most-viewed'}>Most viewed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            defaultValue={'All'}
            onValueChange={selectValue => onSelectChangeUrl('category', selectValue)}
          >
            <SelectTrigger className={'w-1/2 md:w-48'}>
              <SelectValue placeholder={'Filter'} className={'text-muted-foreground'} />
            </SelectTrigger>
            <SelectContent className={'m-0 bg-background'}>
              {projectTags.map(projectTag => (
                <SelectItem key={projectTag} value={projectTag}>
                  {projectTag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {currentUser?.role === 'architector' && (
        <Button asChild className='text-base rounded-[8px]'>
          <Link href={'/add-project'}>Add project</Link>
        </Button>
      )}
    </div>
  )
}
