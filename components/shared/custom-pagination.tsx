'use client'

import { Button } from '../ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { addUrlQuery, getPaginationPages } from '@/lib/utils'

interface CustomPaginationProps {
  page: number
  isNext: boolean
  totalPages: number
}

export default function CustomPagination({ page, isNext, totalPages }: CustomPaginationProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const onNavigate = (nextPage: number) => {
    const newUrl = addUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: nextPage.toString(),
    })

    router.push(newUrl)
  }

  return (
    <div className='mt-8 mb-12 flex justify-center items-center'>
      <div className='flex items-center gap-x-2'>
        <Button size={'sm'} disabled={page === 1} onClick={() => onNavigate(page - 1)}>
          Prev
        </Button>

        {getPaginationPages(page, totalPages).map((p, index, arr) => (
          <div key={p} className='flex items-center'>
            <Button
              size='sm'
              disabled={p === page}
              variant={'outline'}
              onClick={() => onNavigate(p)}
            >
              {p}
            </Button>
            {/* Ellipsis */}
            {index < arr.length - 1 && arr[index + 1] !== p + 1 && <span className='px-1'>…</span>}
          </div>
        ))}

        <Button size={'sm'} disabled={!isNext} onClick={() => onNavigate(page + 1)}>
          Next
        </Button>
      </div>
    </div>
  )
}
