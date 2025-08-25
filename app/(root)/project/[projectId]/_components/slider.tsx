'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'

interface SliderProps {
  projectImages: string[]
}

export default function Slider({ projectImages }: SliderProps) {
  return (
    <Swiper
      spaceBetween={30}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className='mySwiper'
    >
      {projectImages.map((image, index) => (
        <SwiperSlide key={index} className='rounded-[8px]'>
          <div className='full h-64 md:h-[550px] relative rounded-[8px]'>
            <Image
              src={image}
              alt={`Project Image ${index + 1}`}
              fill
              className='object-cover rounded-[8px]'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              priority
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
