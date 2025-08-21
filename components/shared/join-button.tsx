import Link from 'next/link'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function JoinButton() {
  const [isOpenedDropdown, setIsOpenedDropdown] = useState(false)

  return (
    <DropdownMenu onOpenChange={() => setIsOpenedDropdown(!isOpenedDropdown)}>
      <DropdownMenuTrigger asChild>
        <Button
          size={'sm'}
          className='uppercase rounded-[8px] font-bold px-6'
          onClick={() => setIsOpenedDropdown(true)}
        >
          Join {isOpenedDropdown ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-background min-w-48'>
        <DropdownMenuItem asChild className='text-base py-2'>
          <Link href={'/login'} className='font-semibold text-base'>
            Login
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='text-base py-2'>
          <Link href={'/register'} className='font-semibold text-base'>
            Register
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
