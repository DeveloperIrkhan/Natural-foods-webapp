"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousel.css";

const Carousel = () => {
  const slides = [
    {
      image: "/images/Slider-1.png",
      title: "Natural Skincare Products",
      subtitle: "Made with love in Pakistan"
    },
    {
      image: "/images/Slider-2.png",
      title: "100% Organic Ingredients",
      subtitle: "Feel the nature on your skin"
    },
    {
      image: "/images/Slider-3.png",
      title: "Shop Now & Get 10% Off",
      subtitle: "Limited time offer"
    },
    {
      image: "/images/Slider-4.png",
      title: "Shop Now & Get 10% Off",
      subtitle: "Limited time offer"
    },
    {
      image: "/images/Slider-5.png",
      title: "Shop Now & Get 10% Off",
      subtitle: "Limited time offer"
    }
  ];
  return (
    <div className="relative w-full h-[90vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop
        className="h-2/3"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-radial relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl mt-4">{slide.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
