// components/Carousel.tsx

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import projects from "../../data/projects.json";
import Image from "next/image";
import Link from "next/link";

const Carousel = () => {
  return (
    <div className="w-full relative">
      <h2 className="text-3xl font-bold  mb-10 ">Featured Projects</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
        style={{ paddingBottom: "40px" }} // Adjusting bottom padding
      >
        {projects.slice(0, 5).map((project) => (
          <SwiperSlide key={project.id}>
            <div className="flex flex-col items-center">
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-2xl font-semibold mt-4 text-foreground">
                {project.title}
              </h3>
              <p className="text-foreground mt-2 px-4 max-w-2xl text-center">
                {project.description}
              </p>
              <Link
                href={`/projects/${project.id}`}
                className="mt-4 mb-6 px-4 py-2 bg-primary text-white rounded-full hover:bg-primaryDark hover:text-white transition-colors shadow-md"
              >
                Learn More
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styles for Navigation Arrows */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          top: 50%; /* Adjust this to position arrows vertically */
          transform: translateY(-50%);
        }

        /* Responsive Adjustment */
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            top: 40%; /* Raise the arrows higher on smaller screens */
          }
        }
      `}</style>
    </div>
  );
};

export default Carousel;
