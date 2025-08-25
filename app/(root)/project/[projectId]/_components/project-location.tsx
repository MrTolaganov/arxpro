'use client'

import { useEffect, useState } from 'react'

interface ProjectLocationProps {
  location: string
}

export default function ProjectLocation({ location }: ProjectLocationProps) {
  const [locationData, setLocationData] = useState({ lat: 0, lon: 0 })

  useEffect(() => {
    const getLatAndLon = async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          location
        )}&format=json&limit=1`
      )

      const data = await res.json()
      const lat = data[0]?.lat
      const lon = data[0]?.lon

      setLocationData({ lat, lon })
    }

    getLatAndLon()
  }, [location])

  return (
    <iframe
      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.5985383025!2d${locationData.lon}!3d${locationData.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1756131178554!5m2!1sen!2s`}
      loading='lazy'
      className='w-full md:w-1/3 h-64 rounded-[8px]'
    ></iframe>
  )
}
