import React from "react";

const Service = () => {
  return (
    <div className="flex h-full flex-col ">
      <h1 className="px-[16px] py-[40px] text-center text-[34px] font-semibold md:p-20 md:text-5xl lg:border-b lg:border-[#d2d2d7]">
        Our Service
      </h1>

      <div className="wedding-event__decortext-[#fff] ">
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dupynxkci/image/upload/v1706776922/rdmtbheusdppkhr4styw.webp"
            alt="garden"
            className="h-[400px] object-cover md:h-full lg:w-full"
          />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
            <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center gap-5 px-[16px] py-[40px] md:p-20">
              <h6 className="text-base font-medium text-[#fff] md:text-lg">
                SERVICE
              </h6>
              <h1 className="w-[80%] text-center text-[34px] font-semibold leading-[120%] text-[#fff] lg:text-5xl">
                Coffee and Event Hub
              </h1>
              <p className="mb-[12px] text-center text-base font-normal text-[#fff] lg:max-w-[550px]">
                Let our team of skilled baristas and creative minds craft
                delightful and trendy coffee setups for your special moments.
                Trust us to turn your coffee dreams into reality at Tim Hortons.
              </p>
              <button className="button__outline-white md:w-[175px]">
                INQUIRE NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
