'use client'

import { menuLinks, subMenuLinks } from '@/constants'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Star } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import JoinButton from './join-button'
import MobileMenu from './mobile-menu'
import Logo from './logo'
import useCurrentUser from '@/hooks/use-current-user'
import { Skeleton } from '../ui/skeleton'
import UserBox from './user-box'
import UserSkeleton from './user-skeleton'

export default function Header() {
  const { currentUser, isLoading } = useCurrentUser()
  const pathname = usePathname()

  return (
    <header className='bg-transparent h-20 flex items-center justify-between max-sm:px-4 px-20 fixed z-50 w-full backdrop-blur-sm'>
      <nav className='max-md:hidden'>
        <ul className='flex gap-x-12'>
          {menuLinks.map(({ path, name }) => (
            <li key={name}>
              <Link
                href={path}
                className={cn(
                  'font-bold uppercase text-base hover:text-primary',
                  path === pathname ? 'text-primary' : 'text-white-1'
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <MobileMenu />
      <Logo />

      <nav className='flex items-center gap-x-12'>
        <ul className='flex gap-x-12 max-md:hidden md:ml-16'>
          {subMenuLinks.map(({ path, name }) => (
            <li key={name}>
              <Link
                href={path}
                className={cn(
                  'font-bold uppercase text-base hover:text-primary',
                  path === pathname ? 'text-primary' : 'text-white-1'
                )}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>

        {/* <Button
          size={'sm'}
          variant={'ghost'}
          className='hover:bg-transparent text-primary text-lg hover:text-primary max-sm:hidden font-bold'
          asChild
        >
          <div className='flex items-center gap-x-2 font-bold'>
            Get Pro <Star className='fill-primary text-primary size-6' />
          </div>
        </Button> */}

        {isLoading && <UserSkeleton />}
        {!isLoading && currentUser && <UserBox currentUser={currentUser} />}
        {!isLoading && !currentUser && <JoinButton />}
      </nav>
    </header>
  )
}
