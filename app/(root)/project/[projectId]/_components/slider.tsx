'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper/modules'
import Image from 'next/image'

interface SliderProps {
  projectImages: string[]
}

export default function Slider({ projectImages }: SliderProps) {
  return (
    <Swiper
      spaceBetween={30}
      loop
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className='mySwiper'
    >
      {projectImages.map((image, index) => (
        <SwiperSlide key={index}>
          <div className='full h-64 md:h-[550px] relative rounded-[8px]'>
            <Image
              src={image}
              alt={`Project Image ${index + 1}`}
              fill
              className='object-cover rounded-[8px]'
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
