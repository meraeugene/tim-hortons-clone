import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Testimonials = () => {
  return (
    <div className=" border-b border-[#d2d2d7] px-[24px] py-[40px] md:p-20 lg:border-0">
      <div className="flex flex-col items-center justify-center ">
        <img
          src="/images/google.svg"
          alt="google logo"
          className="mb-[8px] object-cover"
        />
        <h6 className="mb-[26px] text-base font-medium">REVIEWS</h6>
        <h1 className="mb-2 text-[34px] font-semibold lg:mb-10 lg:text-5xl">
          Our Clients Say
        </h1>
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        style={{
          "--swiper-navigation-color": "#121212",
          "--swiper-pagination-color": "#121212",
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <h1 className="mx-auto mb-[8px] text-sm italic lg:w-[65%]">
            "Ordered coffee online, and it was the best brew! Impressed everyone
            around. Highly recommend Tim Hortons for your coffee needs!"
          </h1>
          <h5 className=" mb-[34px] text-base font-medium">
            – Ronald Richards
          </h5>
        </SwiperSlide>
        <SwiperSlide>
          <h1 className="mx-auto mb-[8px] text-sm italic lg:w-[65%]">
            "Grabbed coffee online from Tim Hortons, and it was the finest brew!
            Impressed everyone nearby. Wholeheartedly recommend this coffee
            haven!"
          </h1>
          <h5 className=" mb-[40px] text-base font-medium">– Andrew Scott</h5>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonials;
