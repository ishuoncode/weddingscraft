
import React from 'react'
import phot1 from "../../../public/engagement-wishes-for-friend.jpg"
import Card from "@/components/photographers/card"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Search } from 'lucide-react';
import backgroundImage from "../../../public/photographers background image with lotus Ankur.png"
import Image from 'next/image';
import getPhotographer from '@/utils/Photographer/GetPhotographer';




export const metadata = {
  title: "Wedding Photographers",
  description:
    "Capture every special moment with professional wedding photographers. At Dream Wedding, discover talented photographers who specialize in capturing the essence and emotion of your big day. Whether you prefer candid shots, traditional poses, or artistic compositions, find the perfect photographer to create timeless memories.",
  alternates: {
    canonical: `/Photographers`
  },
};



// const Photographs = [
//   { id: "1", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
//   { id: "2", src: phot1, alt: "Pre-wedding", title: "Pre wedding", description: "Full Engagement + Album Shoot", Price: 3000 },
//   { id: "3", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
//   { id: "4", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
//   { id: "5", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
//   { id: "6", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
//   { id: "7", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
//   { id: "8", src: phot1, alt: "Engagement", title: "Engagement", description: "Full Engagement + Album Shoot", Price: 3000 },
//   // { id: "2", src: Banquet2, alt: "Banquet", title: "Decorators" },
//   // { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
//   // { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" }
// ];
const page = async () => {

  const Photographs = await getPhotographer()

  return (
    <div className='w-full h-auto bg-gradient-to-r from-violet-200 to-pink-50'>
      <Image
        src={backgroundImage}
        alt='background image'
        className='absolute -z-1 object-cover h-full w-full'
        loading='lazy'
      />

      <div className='absolute  w-full py-14 z-20 sm:justify-end justify-center flex sm:px-20 '>
        <div className=' border rounded-3xl p-2  w-72  z-10 bg-purple-200 flex justify-between items-center'>
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search for Photographers"
              className="bg-purple-200 text-black placeholder-purple-500 border-purple-300 focus:outline-none  rounded-full p-1 mx-1"
            />

          </div>
          <Search className='cursor-pointer bg-purple-500 rounded-full text-white p-1 size-8 w-full' />
        </div>
      </div>
      <div className='flex py-28 items-center justify-center'>

        <div className='z-10 grid mx-2 xl:grid-cols-6 gap-4 lg:grid-cols-4 sm:grid-cols-4 grid-cols-1'>
          {Photographs.map((card:any) => (

            <Card
              key={card.id}
              _id={card._id}
              img={`${process.env.NEXT_PUBLIC_Backend_Url_Image}images/photographer/${card.billboard}`}
              alt={card.billboard}
              title={card.name}
              description={card.description}
              Price={card.price}
            />

          ))}
        </div>
      </div>
    </div>
  )
}

export default page
