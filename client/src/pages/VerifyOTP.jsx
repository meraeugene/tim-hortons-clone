import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useVerifyOTPMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { waveform } from "ldrs";
import { useDispatch, useSelector } from "react-redux";
import { setOtpStatus } from "../slices/authSlice";
import AuthComponent from "../components/AuthComponent";

const verifyOTP = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, otpStatus } = useSelector((state) => state.auth);

  const [verifyOTP, { isLoading }] = useVerifyOTPMutation();


  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/auth/login";

  const  verified  = otpStatus?.verified

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }

    if (verified ) {
      navigate(redirect);
    }
  }, [redirect, navigate, userInfo, otpStatus]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyOTP({ otp }).unwrap();

      const {verified} = response.data
      dispatch(setOtpStatus({ verified}));
      toast.success(response.message);
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };

  return (
    <div className=" px-4 py-10 md:h-full md:p-20  md:pb-6  md:pt-8  lg:mx-auto lg:h-full lg:w-[70%]  xl:w-1/2 ">
      <div className="email-login__container">
        <h1 className="mb-6  text-2xl font-semibold leading-[120%] md:max-w-[530px] md:text-5xl md:leading-[60px]">
          OTP Code Verification
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col ">
          <p className="pb-3 text-[14px] font-medium">Enter code from email</p>
          <input
            type="text"
            className="input__outline   mb-4 text-[#808080] outline-none"
            placeholder="0000"
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
          />
          <button type="submit" className="button__solid ">
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
              <span>Continue</span>
            )}
          </button>
        </form>

        <p className="mt-3 text-center text-sm">
          Didn't receive the code?
          <Link to="/auth/resendOTP" className="font-bold">
            {" "}
            Resend Code
          </Link>
        </p>
      </div>

      <AuthComponent/>

      <div className="mt-16 flex flex-col items-center justify-center gap-1 md:mt-12 md:h-[17px] md:flex-row md:gap-2 lg:mt-10">
        <a className="text-xs font-medium underline">Privacy Policy</a>
        <div className="md:h-[100%] md:w-[1px] md:bg-[#121212] "></div>
        <a className="text-xs font-medium underline">Terms and Conditions</a>
      </div>
    </div>
  );
};

export default verifyOTP;
