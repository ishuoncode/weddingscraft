'use client'

import { Heart, MapPin, Star } from "lucide-react"
import Image from "next/image"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import axios from "axios"
import { useAuth } from "@/app/authContext"

interface Location {
  city: string
  pincode: string
  area: string
}

interface InnerPageProps {
  id: string
  name: string
  rating: number
  description: string
  location: Location
  locationUrl?: {
    coordinates: number[]
    url: string
  }
  category: string
  link: string
  images: string[]
  price: number
}

export default function InnerPage({
  id,
  name,
  rating,
  description,
  location,
  locationUrl,
  category,
  link,
  images,
  price,
}: InnerPageProps) {
  const [isLiked, setIsLiked] = useState(false)
  const { user, setUser } = useAuth()

  useEffect(() => {
    if (user?.wishlist[category]?.length > 0) {
      const isItemLiked = user.wishlist[category].some((item: string) => item === id)
      setIsLiked(isItemLiked)
    }
  }, [id, user?.wishlist, category])

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const endpoint = isLiked
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/removewishlist`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/addwishlist`

    try {
      const token = localStorage.getItem("jwt_token")
      const response = await axios.patch(
        endpoint,
        { category, itemId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 200) {
        setIsLiked(!isLiked)
        setUser(response.data.data.user)
      } else {
        console.error("Failed to update wishlist")
      }
    } catch (error) {
      console.error("Error updating wishlist:", error)
    }
  }

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg md:w-3/4 border p-4 bg-slate-50 rounded-md mb-6">
      <CardContent className="p-0">
        <div className="flex w-full relative">
          <Link href={`/${link}/${id}`} className="md:w-1/3 h-auto py-4">
            <SwiperComponent images={images} />
          </Link>
          <div className="absolute top-0 right-0 flex items-center space-x-2">
            <motion.div
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Heart
                className={`w-6 h-6 cursor-pointer ${isLiked ? "text-red-500 fill-current" : "text-gray-400"}`}
                onClick={handleLike}
              />
            </motion.div>
          </div>
          <DetailsSection
            name={name}
            rating={rating}
            description={description}
            location={location}
            locationUrl={locationUrl}
            link={link}
            id={id}
            price={price}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 p-4 bg-gray-50">
        <ActionButtons />
      </CardFooter>
    </Card>
  )
}

const SwiperComponent: React.FC<{ images: string[] }> = ({ images }) => (
  <Swiper
    slidesPerView={1}
    centeredSlides={true}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    loop={true}
    pagination={{
      clickable: true,
    }}
    modules={[Autoplay, Pagination]}
    className="max-w-40 sm:max-w-56 max-h-80"
  >
    {images.map((image, index) => (
      <SwiperSlide key={`${index}`}>
        <div className="flex">
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            width={500}
            height={500}
            className="object-cover transition-transform duration-300 hover:scale-105 md:w-60 md:h-48 w-56 h-40 cursor-pointer rounded-2xl"
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
)

interface DetailsSectionProps {
  name: string
  rating: number
  description: string
  location: Location
  locationUrl?: {
    coordinates: number[]
    url: string
  }
  link: string
  id: string
  price: number
}

const DetailsSection: React.FC<DetailsSectionProps> = ({
  name,
  rating,
  description,
  location,
  locationUrl,
  link,
  id,
  price,
}) => (
  <Link href={`/${link}/${id}`} className="space-y-2 w-full px-4 pt-6 md:m-3 md:mb-2">
    <div className="flex justify-between items-center">
      <CardTitle className="text-base md:text-xl font-semibold">{name}</CardTitle>
    </div>
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500">{rating.toFixed(1)}</span>
    </div>
    <p className="md:text-sm text-xs text-gray-500 line-clamp-2">{description}</p>
    <div className="flex items-center space-x-2">
      <MapPin className="w-4 h-4 text-black" />
      {location ? (
        locationUrl?.url ? (
          <Link href={locationUrl.url} className="text-sm text-blue-600 hover:underline">
            {`${location.city}, ${location.area}, ${location.pincode}`}
          </Link>
        ) : (
          <span className="text-sm text-gray-500">{`${location.city}, ${location.area}, ${location.pincode}`}</span>
        )
      ) : (
        <p className="text-sm text-gray-500">No location information available</p>
      )}
    </div>
    <div className="text-sm text-gray-500">
      <p>Price: ₹{price}</p>
    </div>

  </Link>
)

const ActionButtons: React.FC = () => (
  <>
    <Button className="bg-green-600 hover:bg-green-700 text-white">
      Request Pricing
    </Button>
    <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
      More Details
    </Button>
  </>
)