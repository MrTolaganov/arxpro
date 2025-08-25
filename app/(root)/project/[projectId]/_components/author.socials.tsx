'use client'

import { User } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

interface AuthorSocialsProps {
  author: User | null
}

export default function AuthorSocials({ author }: AuthorSocialsProps) {
  return (
    <div className='flex items-center gap-x-8 max-md:ml-3'>
      {author?.facebook && (
        <Link href={author.facebook}>
          <Image src={'/images/fb.png'} alt='' width={32} height={32} />
        </Link>
      )}
      {author?.telegram && (
        <Link href={author.telegram}>
          <Image src={'/images/tg.webp'} alt='' width={32} height={32} />
        </Link>
      )}
      {author?.instagram && (
        <Link href={author.instagram}>
          <Image src={'/images/ig.png'} alt='' width={32} height={32} />
        </Link>
      )}
    </div>
  )
}
