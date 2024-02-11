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
      Instantly login via Google 
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
      
    </div>
  </div>
  )
}

export default AuthComponent