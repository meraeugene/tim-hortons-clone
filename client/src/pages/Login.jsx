import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import AuthComponent from "../components/AuthComponent";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo, otpStatus } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  const { verified } = otpStatus?.data || {};

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }

    // if not verified, redirect to /auth/verifyOTP
    if (verified === false) {
      navigate(redirect);
    }
  }, [redirect, navigate, userInfo, otpStatus]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...response }));
      toast.success(response.message);
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };

  // const googleAuth = async () => {
  //   try {
  //     // window.location.href = "http://localhost:5000/auth/google";
  //     window.location.href =
  //       "http://tim-hortons-clone.onrender.com/auth/google/callback";
  //   } catch (error) {
  //     toast.error(error?.data?.error || error.error || error?.data?.message);
  //   }
  // };

  return (
    <div className=" px-4 py-10 md:h-full md:p-20 md:pb-4 md:pt-8 lg:mx-auto  lg:h-full lg:w-[70%] lg:pt-6  xl:w-1/2 xl:pt-12 ">
      <div className="email-login__container">
        <h1 className="mb-6 text-4xl font-semibold leading-[120%] md:max-w-[550px] md:text-5xl md:leading-[60px]">
          Greetings! Welcome to Tim Hortons Shop.
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col">
          <p className="pb-3 text-[14px] font-medium">Email Address</p>
          <input
            type="email"
            className="input__outline   mb-4 text-[#808080]  outline-none"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className="pb-3 text-[14px] font-medium">Password</p>
          <input
            type="password"
            className="input__outline   mb-4 text-[#808080]  outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
          Don't have an account?{" "}
          <Link
            to={
              redirect
                ? `/auth/register?redirect=${redirect}`
                : `/auth/register`
            }
            className="font-bold"
          >
            Sign up
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

export default Login;
