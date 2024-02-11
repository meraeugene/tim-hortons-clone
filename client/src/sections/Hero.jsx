import React from "react";
import MenuCategories from "../components/MenuCategories.jsx";
import { cld } from "../utils/cloudinary.js";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";

const Hero = () => {
  const myImage = cld.image("e7qpnd6otwdgxb6dfi7z");

  return (
    <div className="lg:flex lg:items-start">
      <div className="border-b border-[#d2d2d7] px-[16px] py-[40px] md:p-20 lg:sticky lg:top-[10%] lg:h-[100%] lg:basis-1/2 lg:border-b-0 lg:pt-10">
        <h1 className="text-[40px]  font-semibold leading-[48px] ">
          Tim Hortons
        </h1>
        <div className="flex gap-1">
          <h1 className="text-[40px]  font-semibold leading-[48px]">
            Coffeehouse
          </h1>
          <h4 className="w-full text-[24px]">®</h4>
        </div>
        <p className="mt-4 text-sm italic text-[#121212e6]">
          Explore exclusively curated coffee blends and delightful treats for
          every moment: Share happiness with our online coffee delivery service.
        </p>
        <div className="mt-12 border-t border-[#d2d2d7]">
          <div className="flex  items-end gap-4 pt-[16px] ">
            <div className="basis-1/2 border-r border-[#d2d2d7] lg:basis-full">
              <AdvancedImage
                cldImg={myImage}
                plugins={[placeholder({ mode: "blur" }), responsive()]}
                className="h-full w-full object-cover pr-[16px]"
              />
            </div>
            <p className="basis-1/2  text-[12px] font-normal lg:text-sm">
              Discover the delight of gifting through our contemporary coffee
              haven. Place your order online and share the freshness of coffee,
              snacks, and gifts today.
            </p>
          </div>
        </div>
      </div>

      <MenuCategories />
    </div>
  );
};

export default Hero;
