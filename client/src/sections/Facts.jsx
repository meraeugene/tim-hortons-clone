import React from "react";

const Facts = () => {
  return (
    <div className="h-full w-full lg:flex">
      <div className="border-b border-t border-[#d2d2d7] px-[16px] py-[40px] md:p-20 lg:sticky lg:top-[10%] lg:h-[100%] lg:w-1/2 lg:basis-1/2 lg:border-b-0 ">
        <h1 className="text-[34px] font-semibold md:text-5xl">
          Why choose us ?
        </h1>
      </div>
      <div className="lg:flex  lg:basis-1/2 lg:flex-col lg:border-l lg:border-[#d2d2d7] ">
        <div className="border-b border-[#d2d2d7] px-[16px] py-[40px] md:p-20 lg:border-t lg:border-[#d2d2d7]  ">
          <h2 className="mb-[16px] text-[26px] font-medium md:text-4xl ">
            Expertly crafted coffee blends.
          </h2>
          <p className="text-base font-normal">
            In our coffee studio, our skilled roasters create the most
            sophisticated and tasteful coffee blends using only the finest and
            freshest beans available. We stay abreast of the latest coffee
            trends and provide unique blends that are certain to captivate your
            palate. Let us enhance your moments with our exceptional blends and
            prompt coffee delivery service.
          </p>
        </div>
        <div className="border-b border-[#d2d2d7] px-[16px] py-[40px]  md:p-20">
          <h2 className="mb-[16px] text-[26px] font-medium md:text-4xl">
            On-time delivery
          </h2>
          <p className="text-base font-normal">
            Never miss a coffee break with our punctual coffee delivery service.
            Our couriers will deliver your coffee personally, without
            compromise, ensuring it arrives in perfect condition. Rely on us to
            deliver your flavorful gift promptly.
          </p>
        </div>
        <div className="border-b border-[#d2d2d7] px-[16px] py-[40px]  md:p-20">
          <h2 className="mb-[16px] text-[26px] font-medium  md:text-4xl">
            Secure transactions
          </h2>
          <p className="text-base font-normal">
            Rest assured when placing a coffee order with us, as we implement
            industry-standard security protocols to safeguard your payment
            details. Your transaction will be secure and trouble-free, allowing
            you to shop with peace of mind.
          </p>
        </div>
        <div className="border-b border-[#d2d2d7] px-[16px] py-[40px]  md:p-20">
          <h2 className="mb-[16px] text-[26px] font-medium  md:text-4xl">
            Subscription by your needs{" "}
          </h2>
          <p className="text-base font-normal">
            With our subscription service customized to your specific
            preferences, relish the convenience of having delightful coffee
            blends delivered to your doorstep at regular intervals. Our
            adaptable service is ideal for busy individuals or those seeking a
            constant supply of fresh coffee. Save time and money with this
            seamless solution to your coffee needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Facts;
