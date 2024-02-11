import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AuthComponent from "../components/AuthComponent";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo, otpStatus } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  const { verified } = otpStatus?.data || {};

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }

    if (verified === true) {
      navigate(redirect);
    }
  }, [redirect, navigate, userInfo, otpStatus]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
      return;
    } else {
      try {
        const response = await register({
          firstName,
          lastName,
          email,
          password,
        }).unwrap();
        toast.success(response.otpStatus.message)
        navigate("/auth/verifyOTP");
      } catch (error) {
        toast.error(error?.data?.error || error.error || error.data.message);
      }
    }
  };

  return (
    <div className=" px-4 py-10 md:h-full md:p-20  md:pb-6  md:pt-8  lg:mx-auto lg:h-full lg:w-[70%]   xl:w-1/2 ">
      <div className="email-login__container">
        <h1 className="mb-6 text-4xl font-semibold leading-[120%] md:max-w-[530px] md:text-5xl md:leading-[60px]">
          Sign up
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col ">
          <p className="pb-3 text-[14px] font-medium">First Name</p>
          <input
            type="text"
            className="input__outline   mb-4 text-[#808080] outline-none"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <p className="pb-3 text-[14px] font-medium">Last Name</p>
          <input
            type="text"
            className="input__outline   mb-4 text-[#808080] outline-none"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <p className="pb-3 text-[14px] font-medium">Email Address</p>
          <input
            type="email"
            className="input__outline   mb-4 text-[#808080] outline-none"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <p className="pb-3 text-[14px] font-medium">Password</p>
          <input
            type="password"
            className="input__outline   mb-4 text-[#808080] outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <p className="pb-3 text-[14px] font-medium">Confirm Password</p>
          <input
            type="password"
            className="input__outline   mb-4 text-[#808080] outline-none"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
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
          Already have an account?{" "}
          <Link
            to={redirect ? `/auth/login?redirect=${redirect}` : `/auth/login`}
            className="font-bold"
          >
            Log in
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

export default Signup;
