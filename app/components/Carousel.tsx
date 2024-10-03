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
    <div className="w-full">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Featured Projects
      </h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
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
              <p className="text-foreground mt-2 px-4">{project.description}</p>
              <Link
                href={`/projects/${project.id}`}
                className="text-primary hover:underline mt-2"
              >
                Learn More
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
