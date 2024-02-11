import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="h-full  lg:flex lg:border lg:border-b-0 lg:border-r-0 lg:border-[#d2d2d7]">
      <div className="border-b border-t border-[#d2d2d7] px-[16px] py-[40px] md:p-20 lg:basis-1/2 lg:border-b-0 lg:border-t-0">
        <h1 className="text-[34px] font-semibold md:text-5xl">About us</h1>
      </div>
      <div className="px-[16px] py-[40px] md:p-20 lg:basis-1/2 lg:border-l lg:border-[#d2d2d7]">
        <h5 className="mb-[24px] text-xs font-medium">OUR STORY</h5>
        <h2 className="mb-[16px] text-[26px] font-medium md:text-4xl">
          Tim Hortons
        </h2>
        <p className="text-base font-normal">
          Tim Hortons, a renowned Canadian coffee and fast-food chain, was
          founded by hockey legend Tim Horton and his business partner Ron Joyce
          in 1964 in Hamilton, Ontario. Initially established as a single coffee
          and donut shop, Tim Hortons rapidly expanded across Canada, becoming a
          beloved national institution. The brand's success can be attributed to
          its commitment to offering quality coffee and fresh baked goods, as
          well as its iconic "double-double" coffee customization (double cream,
          double sugar). In 1995, Tim Hortons merged with Wendy's, an American
          fast-food chain, but the companies separated in 2006. Tim Hortons has
          continued to grow both domestically and internationally, becoming a
          symbol of Canadian culture with its Timbits, coffee, and
          community-oriented approach.
        </p>
        <Link
          to="/about"
          className="button__outline mt-[44px] text-base font-medium md:w-[175px]"
        >
          LEARN MORE
        </Link>
      </div>
    </div>
  );
};

export default About;
