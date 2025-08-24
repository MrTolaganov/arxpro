import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import qs from 'query-string'
import { QueryParams } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addUrlQuery({ params, key, value }: QueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value!

  return qs.stringifyUrl({ url: window.location.pathname, query: currentUrl }, { skipNull: true })
}

export function removeUrlQuery({ params, key }: QueryParams) {
  const currentUrl = qs.parse(params)

  delete currentUrl[key]

  return qs.stringifyUrl({ url: window.location.pathname, query: currentUrl }, { skipNull: true })
}

export function getPaginationPages(page: number, totalPages: number) {
  const delta = 2 // how many pages before/after current
  const start = Math.max(1, page - delta)
  const end = Math.min(totalPages, page + delta)
  const pages: number[] = []

  for (let i = start; i <= end; i++) pages.push(i)

  if (start > 1) pages.unshift(1)
  if (end < totalPages) pages.push(totalPages)

  return [...new Set(pages)]
}
