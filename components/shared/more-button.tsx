import Link from 'next/link'
import { Button } from '../ui/button'

interface MoreButtonProps {
  label: string
  path: string
  className?: string
}

export default function MoreButton({ label, className, path }: MoreButtonProps) {
  return (
    <Button
      variant={'outline'}
      className={`border-primary text-primary rounded-[8px] hover:text-primary hover:bg-transparent ${className}`}
      asChild
    >
      <Link href={path}>{label}</Link>
    </Button>
  )
}
