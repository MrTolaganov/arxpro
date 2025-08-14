import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'
import { Menu, Star, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import JoinButton from './join-button'
import { menuLinks, subMenuLinks } from '@/constants'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function MobileMenu() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className='sm:hidden cursor-pointer' size={32} />
      </SheetTrigger>
      <SheetContent side='top'>
        <SheetHeader className='flex flex-row items-center justify-between'>
          <SheetClose asChild>
            <X size={32} className='cursor-pointer' />
          </SheetClose>

          <SheetClose asChild>
            <Link href={'/'}>
              <Image
                src={'/images/logo.png'}
                alt='Logo'
                width={128}
                height={128}
                className='object-cover'
              />
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <JoinButton />
          </SheetClose>
        </SheetHeader>

        {[...menuLinks, ...subMenuLinks].map(({ path, name }) => (
          <SheetClose key={path} asChild>
            <Link
              href={path}
              className={cn(
                'font-bold uppercase text-base text-center hover:text-primary',
                path === pathname ? 'text-primary' : 'text-white-1'
              )}
            >
              {name}
            </Link>
          </SheetClose>
        ))}

        <SheetClose asChild>
          <Button
            size={'sm'}
            variant={'ghost'}
            className='hover:bg-transparent text-primary text-lg hover:text-primary font-bold'
            asChild
          >
            <div className='flex items-center gap-x-2 font-bold'>
              Get Pro <Star className='fill-primary text-primary size-6' />
            </div>
          </Button>
        </SheetClose>

        <SheetTitle />
        <SheetDescription />
      </SheetContent>
    </Sheet>
  )
}
