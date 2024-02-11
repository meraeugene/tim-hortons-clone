import React, { useState } from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { ImPinterest2 } from "react-icons/im";
import { LiaTelegram } from "react-icons/lia";
import { useSelector } from "react-redux";
import { useRemindUserMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const Footer = () => {
  const userInfo = useSelector((state) => state.auth.userInfo?.data);

  const [email, setEmail] = useState("" || userInfo?.email);

  const [remindUser, { isLoading }] = useRemindUserMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await remindUser({
        email,
      }).unwrap();

      toast.success(res.message);
      dispatch(setCredentials(res));
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };

  return (
    <div className="h-[100%] lg:flex ">
      <div className="md:flex lg:basis-1/2 ">
        <div className="border-b border-t border-[#d2d2d7] px-[16px] py-[40px] md:basis-1/2 md:border-r md:border-[#d2d2d7] md:p-10 ">
          <h3 className="mb-[16px] text-base font-normal">
            "Don't forget to share the joy of Tim Hortons' delightful coffee for
            various occasions – from Valentine's Day to Mother's Day and
            Christmas. Receive a friendly reminder 7 days before; we respect
            your privacy with no spam or address sharing."
          </h3>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Your Email"
              className="input__outline mb-[16px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="button__solid mt-6">
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  Loading ...
                   <l-tailspin
                  size="25"
                  stroke="3.5"
                  speed="1"
                  color="white"
                  ></l-tailspin>
                </div>
              ) : (
                <span>REMIND</span>
              )}
            </button>
          </form>
        </div>

        <div className="border-b border-[#d2d2d7] px-[16px] py-[40px] md:basis-1/2 md:border-t md:p-10  lg:border-r">
          <div className="flex flex-col gap-4">
            <h1 className=" text-base font-normal">Contact Us</h1>

            <div>
              <h4 className="mb-[8px] text-sm font-normal leading-[120%] text-[#808080]">
                Address
              </h4>
              <h5 className="text-[16px] font-semibold leading-[120%]">
                15/4 Khreshchatyk Street, North
              </h5>
            </div>

            <div>
              <h4 className="mb-[8px] text-sm font-normal leading-[120%] text-[#808080]">
                Phone
              </h4>
              <h5 className="text-[16px] font-semibold leading-[120%]">
                +639 000 0000
              </h5>
            </div>

            <div>
              <h4 className="mb-[8px] text-sm font-normal leading-[120%] text-[#808080]">
                General Enquiry:
              </h4>
              <h5 className="text-[16px] font-semibold leading-[120%]">
                timhurtons@gmail.com
              </h5>
            </div>

            <div>
              <h2 className="mb-[16px] text-lg font-normal leading-[120%] text-[#808080]">
                Follow Us
              </h2>
              <div className="flex items-center justify-start gap-8  ">
                <FiFacebook color="#121212" size={24} />
                <FiInstagram color="#121212" size={24} />
                <FiTwitter color="#121212" size={24} />
                <ImPinterest2 color="#121212" size={24} />
                <LiaTelegram color="#121212" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex lg:basis-1/2 ">
        <div className="border-b border-[#d2d2d7] px-[16px] py-[40px] md:basis-1/2 md:border-r md:border-[#d2d2d7] md:p-10 lg:border-t">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-medium text-[#808080]">Shop</h1>
              <span>All Products</span>
              <span>Hot Coffee</span>
              <span>Iced Coffee</span>
              <span>Breakfast</span>
              <span>Lunch and Sandwiches</span>
              <span>Wedges and Dips</span>
              <span>Freshener Diffuser</span>
              <span>Baked Goods</span>
              <span>Retails Packs</span>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-medium text-[#808080]">Service</h1>
              <span>Coffee Subscription</span>
              <span>Coffee and Event Hub</span>
            </div>
          </div>
        </div>

        <div className="border-b border-[#d2d2d7] px-[16px] py-[40px] md:basis-1/2 md:p-10 lg:border-t">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-medium text-[#808080]">About Us</h1>
              <span>Our story</span>
              <span>Blog</span>
              <span>Shipping & returns</span>
              <span>Terms & conditions</span>
              <span>Privacy policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
