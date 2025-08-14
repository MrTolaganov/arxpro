'use client'

import NextTopLoader from 'nextjs-toploader'
import { useEffect, useState } from 'react'

export default function TopLoader() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    mounted && (
      <NextTopLoader
        color={'#d65a00'}
        initialPosition={0.5}
        crawlSpeed={200}
        height={2}
        crawl={true}
        showSpinner={false}
        easing='ease'
        speed={200}
        shadow={`0 0 10px ${'#d65a00'},0 0 5px ${'#d65a00'}`}
      />
    )
  )
}
