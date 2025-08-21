import FavProjectCard from '@/components/cards/fav-project.card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FavoriteProjects() {
  return (
    <div className='px-4 md:px-24'>
      <h2 className='text-xl md:text-2xl font-semibold mb-4'>Favorite</h2>

      <div className='mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5'>
        {Array.from({ length: 5 }).map((_, index) => (
          <FavProjectCard
            key={index}
            index={index + 1}
            title={`Project #${index + 1}`}
            subTitle={'Landing flower a rent apartment place'}
            imageSrc='/images/architecture.png'
            location='Chilonzor, Tashkent'
            description='Lorem Ipsum sit amet consectetur adipisicing elit. Nisi quas possimus alias. Dolore hic
          voluptatibus ducimus! Sunt laudantium molestiae at.'
            category='Family Care'
            rating={24}
          />
        ))}
      </div>

      <Button
        variant={'outline'}
        className={`mt-8 border-orange-2 text-orange-2 rounded-[8px] hover:text-orange-2 hover:bg-transparent `}
        asChild
      >
        <Link href={'/projects'}>Show more</Link>
      </Button>
    </div>
  )
}
