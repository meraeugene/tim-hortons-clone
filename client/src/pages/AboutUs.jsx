import React from "react";
import { FiFacebook } from "react-icons/fi";
import { IoLogoInstagram } from "react-icons/io";
import { ImPinterest2 } from "react-icons/im";
import { CiTwitter } from "react-icons/ci";
import { PiTelegramLogoThin } from "react-icons/pi";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div>
      <div className="our-story__container flex flex-col md:flex-row md:gap-10 md:p-16 md:pb-0  lg:gap-0 lg:p-0">
        <div className="left-col__container flex basis-1/2 flex-col items-center px-4 py-10  md:items-start md:px-0 md:py-0 lg:items-center lg:justify-center lg:border-r lg:border-[#121212] lg:p-20 ">
          <h1 className="text-3xl font-semibold md:text-5xl lg:text-7xl">
            Our Story
          </h1>
          <h1 className="mt-4 font-zapfino text-4xl md:text-7xl lg:text-8xl ">
            About
          </h1>
          <h1 className="mb-4 text-xl font-semibold md:mb-8 md:text-5xl lg:mb-8 lg:text-7xl">
            Tim Hortons
          </h1>
          <p className="text-center text-sm  md:text-left md:text-lg lg:text-center lg:text-2xl">
            Explore Exceptional Coffee and Tempting Breads: Indulge in the Tim
            Hortons Experience!
          </p>
          <div className="mt-8 flex gap-2 md:gap-4 lg:mt-12">
            <div>
              <IoLogoInstagram
                size={45}
                className=" rounded-full border border-[#121212] p-2"
              />
            </div>
            <div>
              <ImPinterest2
                size={45}
                className=" rounded-full border border-[#121212] p-2"
              />
            </div>
            <div>
              <FiFacebook
                size={45}
                className=" rounded-full border border-[#121212] p-2"
              />
            </div>
            <div>
              <CiTwitter
                size={45}
                className=" rounded-full border border-[#121212] p-2"
              />
            </div>
            <div>
              <PiTelegramLogoThin
                size={45}
                className=" rounded-full border border-[#121212] p-2"
              />
            </div>
          </div>
        </div>
        <div className="right-col__container basis-1/2 lg:py-20">
          <img
            src="https://res.cloudinary.com/dupynxkci/image/upload/v1706776982/uxuw6upzha3mkvjcxdzb.webp"
            alt="tim hortons"
            className="object-cover md:rounded-md lg:mx-auto lg:h-full lg:w-[70%]"
            loading="lazy"
          />
        </div>
      </div>

      <div className="founder-story__container flex flex-col items-center px-4 py-10 md:p-16 lg:border-t lg:border-[#d2d2d7] lg:px-20 lg:py-32">
        <h1 className="mb-4 text-xs font-medium uppercase md:text-base">
          Our Story
        </h1>
        <h1 className="mb-4 text-2xl font-semibold md:text-4xl lg:mb-6 lg:text-5xl">
          Our Founder's Passion{" "}
        </h1>
        <p className="text-justify text-sm md:text-center md:text-base lg:w-[55%] lg:text-lg">
          Tim Hortons, established in 2010, is dedicated to bringing distinctive
          and exceptional coffee and bread offerings to the residents of Kyiv.
          With a focus on quality and flavor, our mission is to be a local
          coffee and bakery destination, providing fresh and unique blends and
          selections crafted with care.
        </p>
      </div>

      <div className="crafted__container flex flex-col  md:p-16 lg:flex-row lg:gap-12 lg:py-0">
        <div className="left-col__container basis-1/2">
          <img
            src="https://res.cloudinary.com/dupynxkci/image/upload/v1706777051/jbrkls7cxm9qgqhap3wa.webp"
            alt="tim hortons"
            className=" object-cover md:rounded-md"
            loading="lazy"
          />
        </div>
        <div className="right-col__container flex basis-1/2  flex-col px-4 py-10 md:px-0 lg:p-0">
          <h1 className="mb-4 text-2xl font-semibold md:text-3xl lg:mb-6 lg:text-4xl ">
            Exceptional Coffee Craftsmanship
          </h1>
          <p className="text-justify text-sm lg:text-lg">
            At Tim Horton's, we celebrate our team of skilled and seasoned
            baristas who meticulously select each coffee bean, ensuring that
            only the finest and most flavorful brews make it into our cups. We
            establish direct partnerships with coffee growers to source the
            highest quality beans, and our talented baristas expertly craft each
            cup to perfection.
          </p>
        </div>
      </div>

      <div className="atmosphere__container flex flex-col md:p-16 md:pt-0  lg:flex-row lg:gap-12 lg:py-20 ">
        <div className="left-col__container lg:basis-1/2">
          <img
            src="https://res.cloudinary.com/dupynxkci/image/upload/v1706777071/brejbdzfab0o2zmphngy.webp"
            alt="tim hortons"
            className="object-cover md:rounded-md"
            loading="lazy"
          />
        </div>
        <div className="right-col__container flex flex-col px-4  py-10 md:px-0 lg:basis-1/2 lg:p-0">
          <h1 className="mb-4 text-2xl font-semibold md:text-3xl lg:mb-6 lg:text-4xl ">
            Coffee, Treats & Atmosphere
          </h1>
          <p className="text-justify text-sm lg:text-lg">
            In addition to our exceptional coffee blends and mouthwatering bread
            selections, Tim Horton's also offers a variety of dried bouquets,
            house plants, and scented candles from luxury brands to enhance the
            overall ambiance. We believe in making the experience of enjoying
            great coffee, delicious bread, and choosing thoughtful gifts easy
            and stress-free, reflected in our same or next-day delivery
            services.
          </p>
        </div>
      </div>

      <div className="elavating__container lg:py:0 flex flex-col md:p-16 md:pt-0 lg:flex-row lg:gap-12">
        <div className="left-col__container lg:basis-1/2 ">
          <img
            src="https://res.cloudinary.com/dupynxkci/image/upload/v1706777096/ishwhona9o7ubtxale53.webp"
            alt="tim hortons"
            className="object-cover md:rounded-md"
            loading="lazy"
          />
        </div>
        <div className="right-col__container  flex flex-col px-4   py-10 md:px-0 lg:basis-1/2 lg:p-0">
          <h1 className="mb-4 text-2xl font-semibold md:text-3xl lg:mb-6 lg:text-4xl">
            Elevating Everyday Moments
          </h1>
          <p className="text-justify text-sm lg:text-lg">
            Our mission is simple: to make each day special and memorable for
            our customers through the exceptional experience of great coffee and
            delicious bread. We are dedicated to providing the highest quality
            brews, outstanding customer service, and a seamless online
            experience that will leave you confident and satisfied with your
            purchase at Tim Hortons. Thank you for choosing Tim Hortons. We look
            forward to bringing joy and satisfaction to your daily routine with
            our superb coffee and delectable bread offerings.
          </p>
        </div>
      </div>

      <div
        className="discover__container flex flex-col items-center border-t border-[#d2d2d7] px-4 py-10 md:p-20
      "
      >
        <h1 className="mb-4 text-center text-4xl font-semibold md:text-6xl md:leading-[120%] lg:mb-8">
          Savor Unique Coffee, Indulge.
        </h1>
        <p className="mb-8 text-center text-sm font-medium md:mb-12 md:w-[85%] lg:w-[55%] lg:text-lg">
          Explore our range of exceptional coffees and delectable breads to
          treat yourself and surprise your loved ones. Click the button below to
          start your delightful journey at Tim Hortons.
        </p>
        <Link to="/" className="button__solid md:w-1/2 lg:w-1/4">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
