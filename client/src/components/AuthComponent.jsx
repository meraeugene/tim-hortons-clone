import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import {toast} from "react-toastify"
import { app } from "../firebase"
import {  useLoginGoogleAuthMutation } from "../slices/usersApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";


const AuthComponent = () => {

  const [loginGoogleAuth, { isLoading: loadingGoogleAuth }] =
  useLoginGoogleAuthMutation();

  const dispatch = useDispatch();


  const googleAuth =  async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth,provider)

      const data = await loginGoogleAuth({
        firstName: result._tokenResponse.firstName,
        lastName: result._tokenResponse.lastName,
        email: result._tokenResponse.email,
        verified: result._tokenResponse.emailVerified,
        image: result._tokenResponse.photoUrl,
      })
      toast.success(data.data.message)
      dispatch(setCredentials(data ));
    } catch (error) {
      toast.error("Couldn't connect to Google",error)
    }
  }

  return (
    <div className="google-facebook-signup__container  ">
    <div className="or__container mb-4 mt-6 flex items-center justify-center gap-3">
      <div className="h-[1px] basis-1/2 bg-[#d2d2d7]" />
      <p className="flex items-center justify-center text-sm font-normal  text-[#d2d2d7]">
        or
      </p>
      <div className="h-[1px] basis-1/2 bg-[#d2d2d7]" />
    </div>
    <p className="mb-3 text-sm font-medium">
      Instantly login via Google | Facebook
    </p>
    <div className="buttons__contaner flex flex-col gap-4 md:flex-row">
      <button
        onClick={googleAuth}
        // to="http://localhost:5000/auth/google"
        className="flex w-full items-center justify-center gap-2 border border-[#121212] px-6 py-[11px]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21.9992 11.235C21.9992 10.5417 21.943 9.84465 21.8231 9.1626H12.2031V13.09H17.712C17.4834 14.3567 16.7489 15.4772 15.6733 16.1892V18.7375H18.9599C20.8899 16.9612 21.9992 14.3379 21.9992 11.235Z"
            fill="#4285F4"
          />
          <path
            d="M12.2038 21.1996C14.9545 21.1996 17.2743 20.2965 18.9644 18.7375L15.6778 16.1892C14.7634 16.8113 13.5829 17.1636 12.2076 17.1636C9.54684 17.1636 7.29083 15.3685 6.48136 12.9551H3.08984V15.5821C4.8212 19.0261 8.34763 21.1996 12.2038 21.1996Z"
            fill="#34A853"
          />
          <path
            d="M6.47658 12.9553C6.04937 11.6886 6.04937 10.317 6.47658 9.05036V6.42334H3.08882C1.64227 9.30519 1.64227 12.7005 3.08882 15.5823L6.47658 12.9553Z"
            fill="#FBBC04"
          />
          <path
            d="M12.2038 4.83805C13.6579 4.81556 15.0632 5.3627 16.1163 6.36704L19.0281 3.45521C17.1843 1.72385 14.7372 0.771977 12.2038 0.801957C8.34763 0.801957 4.8212 2.97552 3.08984 6.42325L6.47761 9.05027C7.28333 6.63311 9.54309 4.83805 12.2038 4.83805Z"
            fill="#EA4335"
          />
        </svg>
        <span className="text-xs font-medium">CONTINUE WITH GOOGLE</span>
      </button>
      <button className="flex w-full items-center justify-center gap-2 border border-[#121212] px-6 py-[11px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M48 24C48 10.7438 37.2562 0 24 0C10.7438 0 0 10.7438 0 24C0 35.9813 8.775 45.9094 20.25 47.7094V30.9375H14.1562V24H20.25V18.7125C20.25 12.6984 23.8313 9.375 29.3156 9.375C31.9406 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6594C28.6781 15.75 27.75 17.6016 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7094C39.225 45.9094 48 35.9813 48 24Z"
            fill="#1877F2"
          />
          <path
            d="M33.3422 30.9375L34.4062 24H27.75V19.5C27.75 17.6016 28.6781 15.75 31.6594 15.75H34.6875V9.84375C34.6875 9.84375 31.9406 9.375 29.3156 9.375C23.8313 9.375 20.25 12.6984 20.25 18.7125V24H14.1562V30.9375H20.25V47.7094C21.4734 47.9016 22.725 48 24 48C25.275 48 26.5266 47.9016 27.75 47.7094V30.9375H33.3422Z"
            fill="white"
          />
        </svg>

        <span className="text-xs font-medium"> CONTINUE WITH FACEBOOK</span>
      </button>
    </div>
  </div>
  )
}

export default AuthComponent