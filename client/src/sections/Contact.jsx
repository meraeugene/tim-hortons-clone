import React, { useState } from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { ImPinterest2 } from "react-icons/im";
import { LiaTelegram } from "react-icons/lia";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";

const Contact = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleBookCall = (e) => {
    e.preventDefault();
    // Use tel: to create a phone link
    window.location.href = `tel:${phoneNumber}`;
  };
  return (
    <div className="flex flex-col lg:h-full  lg:flex-row-reverse lg:border-b  lg:border-[#d2d2d7]">
      <div className="right__container h-full flex-col lg:basis-1/2">
        <div>
          <img
            src="https://res.cloudinary.com/dupynxkci/image/upload/v1706776834/ytrlkrkk8dwiuvawozy1.webp"
            alt="shop"
            className="w-full object-cover "
          />
        </div>
        <div className="content  ">
          <div className="flex w-full flex-col items-start  justify-between  border-b  border-[#d2d2d7] md:flex-row md:items-center">
            <h1 className="pl-4 text-[26px] font-bold md:basis-1/2 md:border-r md:border-[#d2d2d7] md:px-[40px] md:py-[16px] lg:border-l lg:border-[#d2d2d7]">
              Follow us
            </h1>
            <div className="flex items-center justify-start gap-8  pb-4 pl-2 pt-2 md:basis-1/2 md:justify-center  md:px-[40px] md:py-[16px] ">
              <FiFacebook color="#121212" size={24} />
              <FiInstagram color="#121212" size={24} />
              <FiTwitter color="#121212" size={24} />
              <ImPinterest2 color="#121212" size={24} />
              <LiaTelegram color="#121212" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="left__container lg:basis-1/2 lg:flex-col lg:border-t lg:border-[#d2d2d7]">
        <div className="contact-us__container px-4 py-10 md:p-20 lg:h-1/2 lg:border-b lg:border-[#d2d2d7]">
          <h1 className="mb-6 text-4xl font-bold lg:text-5xl">To Contact Us</h1>
          <h4 className="mb-4">We will call you back</h4>
          <form
            onSubmit={handleBookCall}
            className="flex flex-col gap-4 md:flex-row "
          >
            <input
              type="text"
              placeholder="+639 000 0000"
              className="input__outline"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <button type="submit" className="button__solid ">
              BOOK A CALL
            </button>
          </form>
        </div>

        <div className="flex flex-col  md:flex-row lg:h-1/2 lg:flex-row">
          <div className="phone__container md:basis-1/2  ">
            <div className="md:h-[10%]">
              <h1 className="border-b border-t border-[#d2d2d7] p-4  text-left text-2xl font-bold md:text-center lg:border-b lg:border-[#d2d2d7] lg:text-[38px]">
                Phone
              </h1>
            </div>
            <main className=" flex  flex-col items-start justify-center gap-2  px-4  py-10 md:h-full md:items-center md:py-20 lg:h-[90%]">
              <div className="flex items-center gap-1">
                <MdOutlineLocalPhone size={25} color="#d2d2d7" />
                +639 000 0000
              </div>
              <div className="flex items-center gap-1">
                <MdOutlineLocalPhone size={25} color="#d2d2d7" />
                +639 000 0000{" "}
              </div>
            </main>
          </div>

          <div className="address__container md:basis-1/2   md:border-l md:border-[#d2d2d7]">
            <div className="md:h-[10%]">
              <h1 className="border-b border-t border-[#d2d2d7] p-4  text-left text-2xl font-bold md:text-center  lg:text-[38px]">
                Address
              </h1>
            </div>
            <main className=" flex  flex-col items-start justify-center gap-2  px-4  py-10 md:h-full md:items-center md:py-20 lg:h-[90%]">
              <h5>OPENING HOURS: 8 TO 11PM</h5>
              <div className="flex">
                <CiLocationOn size={25} color="#121212" />
                15/4 Khreshchatyk Street, North
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
