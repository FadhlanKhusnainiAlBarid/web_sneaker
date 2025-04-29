import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function Home() {
  return (
    <div className="container mx-auto">
      <div className="relative h-64">
        <Swiper
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={30}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          modules={[Mousewheel, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="size-full bg-amber-400 flex justify-center items-center">
              Slide 1
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="size-full bg-amber-400 flex justify-center items-center">
              Slide 2
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="size-full bg-amber-400 flex justify-center items-center">
              Slide 3
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="size-full bg-amber-400 flex justify-center items-center">
              Slide 4
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="size-full bg-amber-400 flex justify-center items-center">
              Slide 5
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="size-full bg-amber-400 flex justify-center items-center">
              Slide 6
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="size-full bg-amber-400 flex justify-center items-center">
              Slide 7
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="size-full bg-amber-400 flex justify-center items-center">
              Slide 8
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="size-full bg-amber-400 flex justify-center items-center">
              Slide 9
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Home;
