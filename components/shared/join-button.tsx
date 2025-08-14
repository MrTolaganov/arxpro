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
      <DropdownMenuContent className='bg-blue-3'>
        <DropdownMenuItem asChild>
          <Link href={'/login'} className='font-semibold'>
            Login
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/register'} className='font-semibold'>
            Register
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
