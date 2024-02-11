import { IoMdClose } from "react-icons/io";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { ImPinterest2 } from "react-icons/im";
import { LiaTelegram } from "react-icons/lia";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCartItems,
  removeFromCart,
} from "../slices/cartSlice";
import { MdDeleteOutline } from "react-icons/md";
import { formatPrice } from "../utils/cartUtils";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import { cld } from "../utils/cloudinary";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { RiAdminLine } from "react-icons/ri";
import { GrContact } from "react-icons/gr";
import { BsShop } from "react-icons/bs";
import { LiaUsersCogSolid } from "react-icons/lia";
import { BsBoxes } from "react-icons/bs";
import { MdOutlineReviews } from "react-icons/md";
import { LuUserCircle } from "react-icons/lu";
import { LiaUserEditSolid } from "react-icons/lia";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineContacts } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { BsQuestionSquare } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiNewspaperLine } from "react-icons/ri";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { resetCart } from "../slices/cartSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import {capitalizeFirstLetter} from "../utils/capitalizeFirstLetter"

const Header = () => {
  const [navState, setNavState] = useState(false);
  const [cartState, setCartState] = useState(false);
  const [profileNav, setProfileNav] = useState(false);
  const [adminNav, setAdminNav] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const {
  //   data: user,
  //   isLoading: loadingGoogeAuth,
  //   error: errorGoogleAuth,
  // } = useGetGoogleSuccessUserQuery();

  // useEffect(() => {
  //   if (user) {
  //     toast.success(user.message);
  //     dispatch(setCredentials({ ...user }));
  //   }
  // }, [user]);

  const currentYear = new Date().getFullYear();

  const { cartItems, itemsPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const toggleNav = () => {
    setNavState(!navState);
    document.body.classList.toggle("menu-open");
  };

  const toggleCart = () => {
    setProfileNav(false);
    setAdminNav(false);
    setCartState(!cartState);
    document.body.classList.toggle("menu-open");
  };

  const removeFromCartHandler = async (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  const increaseQuantityHandler = async (id, size) => {
    dispatch(increaseQuantity({ id, size }));
  };

  const decreaseQuantityHandler = async (id, size) => {
    dispatch(decreaseQuantity({ id, size }));
  };

  const checkoutHandler = () => {
    setCartState(!cartState);
    document.body.classList.toggle("menu-open");
    navigate("/auth/login?redirect=/checkout/information");

    if (!userInfo) {
      toast.error("Please login to checkout.");
    }
  };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      setNavState(false);
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/auth/login");
      toast.success("Logout successfully");
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };


  return (
    <>
      <div className="hidden w-full justify-between border border-r-0 border-[#d2d2d7] bg-white font-bold  md:hidden lg:sticky lg:top-0 lg:z-40 lg:flex">
        <div className="flex items-center justify-center">
          <Link
            to="/"
            onClick={() => {
              setProfileNav(false);
              setAdminNav(false);
            }}
            className=" flex h-[70px] w-[150px] items-center justify-center border-r border-[#d2d2d7]"
          >
            <div className="flex items-center gap-2">
              <BsShop />
              Shop
            </div>
          </Link>
          <Link
            to="/contact"
            className=" flex h-[70px] w-[150px] items-center justify-center border-r border-[#d2d2d7]"
            onClick={() => {
              setProfileNav(false);
              setAdminNav(false);
            }}
          >
            <div className="flex items-center gap-2">
              <GrContact />
              Contact
            </div>
          </Link>
        </div>
        <div className="flex ">
          {userInfo && userInfo.data.isAdmin && (
            <div
              className="relative flex h-[70px] w-[150px] cursor-pointer items-center justify-center border-l border-[#d2d2d7]"
              onClick={() => {
                setAdminNav(!adminNav);
                setProfileNav(false);
              }}
            >
              <div className="flex items-center gap-2">
                <RiAdminLine />
                <h1>Admin</h1>
              </div>

              {adminNav && (
                <div className="absolute bottom-[-350px] right-[-0px] flex flex-col ">
                  <Link
                    to="/admin/orderlist"
                    className=" flex h-[70px] w-[150px]  items-center  justify-center border border-[#d2d2d7] bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <AiOutlineContacts />
                      Orders
                    </div>
                  </Link>
                  <Link
                    to="/admin/userlist"
                    className=" flex h-[70px] w-[150px]  items-center  justify-center border border-b-0 border-t-0 border-[#d2d2d7] bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <LiaUsersCogSolid />
                      Users
                    </div>
                  </Link>

                  <Link
                    to="/admin/productlist"
                    className=" flex h-[70px] w-[150px]  items-center  justify-center border border-[#d2d2d7] bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <BsBoxes />
                      Products
                    </div>
                  </Link>
                  <Link
                    to="/admin/reviewlist"
                    className=" flex h-[70px] w-[150px]  items-center  justify-center border border-t-0 border-[#d2d2d7] bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <MdOutlineReviews />
                      Reviews
                    </div>
                  </Link>
                  <Link
                    to="/admin/contactlist"
                    className=" flex h-[70px] w-[150px]  items-center  justify-center border border-t-0 border-[#d2d2d7] bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <AiOutlineContacts />
                      Contacts
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}

          {userInfo ? (
            <div
              className=" relative flex h-[70px] min-w-[205px] cursor-pointer items-center justify-center border-l border-[#d2d2d7]"
              onClick={() => {
                setProfileNav(!profileNav);
                setAdminNav(false);
              }}
            >
          
   


          <div className="flex items-center gap-2">
            <img
              src={userInfo.data.image}
              alt={userInfo.data.firstName}
              className="w-[30px] rounded-full object-cover"
            />
<h1>
  {capitalizeFirstLetter(userInfo.data.firstName)}{' '}
  {capitalizeFirstLetter(userInfo.data.lastName)}
</h1>          </div>


               

              {profileNav && (
                <div className="absolute bottom-[-140px] right-[-0px] flex flex-col ">
                  <Link
                    to="/profile"
                    className=" flex  h-[70px] min-w-[205px] items-center justify-center border border-[#d2d2d7] bg-white "
                  >
                    <div className="flex items-center gap-2">
                      <LiaUserEditSolid />
                      Profile
                    </div>
                  </Link>

                  <div
                    className=" flex  h-[70px] min-w-[205px] items-center justify-center border border-t-0 border-[#d2d2d7] bg-white "
                    onClick={logoutHandler}
                  >
                    <div className="flex items-center gap-2">
                      <BiLogOutCircle />
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth/login"
              className=" flex h-[70px] w-[150px] items-center justify-center gap-2 border-l border-[#d2d2d7]"
            >
              <AiOutlineLogin />
              Sign in
            </Link>
          )}

          <div
            onClick={toggleCart}
            className=" flex h-[70px] w-[150px] cursor-pointer items-center justify-center gap-2 border-l border-[#d2d2d7]"
          >
            <div className="flex items-center gap-2">
              <RiShoppingCartLine />

              <span> Cart</span>
            </div>
            {cartItems.length > 0 && (
              <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#121212] text-white">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="sticky top-0 flex justify-between border-b border-t border-[#d2d2d7] bg-white  lg:hidden">
        <button
          className="burger__menu flex h-[50px] w-[50px] items-center justify-center border-r border-[#d2d2d7]"
          onClick={toggleNav}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
              fill="#121212"
            />
          </svg>
        </button>
        <button
          className="cart__icon flex h-[50px] w-[50px] items-center justify-center border-l border-[#d2d2d7]"
          onClick={toggleCart}
        >
          <div className="relative">
            <RiShoppingCartLine size={20} color="#121212" />
            {cartItems.length > 0 && (
              <div className="absolute right-[-4px] top-[-7px] flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#121212] text-xs text-white">
                {cartItems.length}
              </div>
            )}
          </div>
        </button>
      </div>
      {navState && (
        <div className="nav__mobile fixed   left-0 top-0 z-30 h-screen w-full  overflow-y-scroll bg-white  md:h-full md:w-[50%] md:border-r md:border-[#d2d2d7] ">
          <div className="border-b border-[#d2d2d7] p-[14px] ">
            <button onClick={toggleNav}>
              <IoMdClose size={35} color="#121212" />
            </button>
          </div>
          <ul>
            <li
              className={`${userInfo ? "" : "border-b border-[#d2d2d7] p-6"}`}
            >
              {userInfo ? (
                <div>
                  <div className="flex items-center gap-3 border-b border-[#d2d2d7] p-6 text-xl font-semibold">
                   
                      <img
                        src={userInfo.data.image}
                        alt={userInfo.data.firstName}
                        className="w-[30px] rounded-full object-cover"
                      />
                     

                     <h1>
  {capitalizeFirstLetter(userInfo.data.firstName)}{' '}
  {capitalizeFirstLetter(userInfo.data.lastName)}
</h1>
                 
                  </div>

                  <div
                    onClick={toggleNav}
                    className="flex items-center gap-2 border-b border-[#d2d2d7] p-6 text-xl font-semibold"
                  >
                    <LiaUserEditSolid />
                    <Link to="/profile">Profile</Link>
                  </div>

                  {userInfo.data.isAdmin && (
                    <>
                      <div
                        onClick={toggleNav}
                        className="flex items-center gap-2 border-b border-[#d2d2d7] p-6 text-xl font-semibold"
                      >
                        <MdOutlineAdminPanelSettings />

                        <Link to="/admin/orderlist">Orders List</Link>
                      </div>
                      <div
                        onClick={toggleNav}
                        className="flex items-center gap-2 border-b border-[#d2d2d7] p-6 text-xl font-semibold"
                      >
                        <MdOutlineAdminPanelSettings />

                        <Link to="/admin/userlist">Users List</Link>
                      </div>

                      <div
                        onClick={toggleNav}
                        className="flex items-center gap-2 border-b border-[#d2d2d7] p-6 text-xl font-semibold"
                      >
                        {" "}
                        <MdOutlineAdminPanelSettings />
                        <Link to="/admin/productlist">Products List</Link>
                      </div>
                      <div
                        onClick={toggleNav}
                        className="flex items-center gap-2 border-b border-[#d2d2d7] p-6 text-xl font-semibold"
                      >
                        {" "}
                        <MdOutlineAdminPanelSettings />
                        <Link to="/admin/reviewlist">Reviews List</Link>
                      </div>
                      <div
                        onClick={toggleNav}
                        className="flex items-center gap-2 border-b border-[#d2d2d7] p-6 text-xl font-semibold"
                      >
                        <MdOutlineAdminPanelSettings />

                        <Link to="/admin/contactlist">Contacts List</Link>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="flex items-center gap-2  text-xl font-semibold"
                  onClick={toggleNav}
                >
                  <AiOutlineLogin />
                  Sign in
                </Link>
              )}
            </li>

         
              <Link
                to="/"
                className="flex items-center gap-2 text-xl font-semibold border-b border-[#d2d2d7] p-6 "
                onClick={toggleNav}
              >
                <BsShop />
                Shop
              </Link>
            
              <Link
                to="/service"
                className="flex items-center gap-2 text-xl font-semibold border-b border-[#d2d2d7] p-6 "
                onClick={toggleNav}
              >
                <RiCustomerService2Line />
                Service
              </Link>
         
           
              <Link
                to="/contact"
                className="flex items-center gap-2 text-xl font-semibold border-b border-[#d2d2d7] p-6"
                onClick={toggleNav}
              >
                <GrContact />
                Contact
              </Link>
            
              <Link
                to="/about"
                className="flex items-center gap-2 text-xl font-semibold border-b border-[#d2d2d7] p-6"
                onClick={toggleNav}
              >
                <BsQuestionSquare />
                About Us
              </Link>
           
        
              <Link
                to="/shippings&returns"
                className="flex items-center gap-2 text-xl font-semibold border-b border-[#d2d2d7] p-6"
                onClick={toggleNav}
              >
                <LiaShippingFastSolid />
                Shippings & Returns
              </Link>
          
              <Link
                to="/terms&conditions"
                className="flex items-center gap-2 text-xl font-semibold border-b border-[#d2d2d7] p-6"
                onClick={toggleNav}
              >
                <RiNewspaperLine />
                Term & Conditions
              </Link>
          
              <Link
                to="privacypolicy"
                className="flex items-center gap-2 text-xl font-semibold border-b border-[#d2d2d7] p-6 "
                onClick={toggleNav}
              >
                <MdOutlinePrivacyTip />
                Privacy Policy
              </Link>
            {userInfo && (
              <Link                   onClick={logoutHandler}
              to="/" className="border-b border-[#d2d2d7] p-6 flex items-center gap-2 text-xl font-semibold">
               
                  <BiLogOutCircle />
                  Logout
              
              </Link>
            )}

            <li className="flex items-center justify-between border-b border-[#d2d2d7] p-6">
              <FiFacebook color="#121212" size={24} />
              <FiInstagram color="#121212" size={24} />
              <FiTwitter color="#121212" size={24} />
              <ImPinterest2 color="#121212" size={24} />
              <LiaTelegram color="#121212" size={24} />
            </li>
          </ul>

          <span className="mb-4 mt-4 flex items-center justify-center font-bold">
            {" "}
            © Tim Hortons {currentYear}
          </span>
        </div>
      )}

      {cartState && (
        <div className="overlay fixed inset-0 z-40 bg-[rgba(210,210,215,0.35)] backdrop-blur-[4px] transition-all duration-300"></div>
      )}

      <div
        className={`fixed right-0  top-0 z-50 h-full w-full  overflow-y-scroll    bg-white opacity-100 transition-all duration-300 md:w-[70%] md:border md:border-r-0 md:border-t-0 md:border-l-[#d2d2d7] lg:w-1/2 ${
          cartState
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-full opacity-0"
        } `}
      >
        <div className="cart__header sticky left-0 top-0 flex  items-center justify-between border-b  border-[#d2d2d7] bg-white px-4 py-3 lg:px-3 lg:py-[20px]">
          <div className="flex gap-2">
            <button className="close__btn" onClick={toggleCart}>
              <IoCloseOutline size={30} color="#121212" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-medium lg:text-lg">Your Cart</h1>
              <span>({cartItems.length} Items)</span>
            </div>
          </div>
          <div className="clear__btn">
            <button
              className="rounded-sm bg-red-500 p-2  text-xs text-white lg:px-4 lg:py-2"
              onClick={() => dispatch(clearCartItems())}
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div
          className={`${
            cartItems.length > 0
              ? "cart__body overflow-y-auto  pb-[205px]  pt-[25px]  md:pb-[210px]  md:pt-[25px] lg:pb-[190px] lg:pt-[30px]"
              : ""
          } `}
        >
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              const myImage = cld.image(item.image);

              return (
                <div
                  className={`flex w-full items-center gap-4 border-b border-[#d2d2d7]  px-4  py-3 lg:gap-4 ${
                    index === 0 ? "border-t border-[#d2d2d7]" : ""
                  }`}
                  key={`${item._id}_${index}`}
                >
                  <div className="img__container basis-[40%]">
                    <Link
                      to={`/products/${item._id}/category/${item.category}`}
                      onClick={toggleCart}
                    >
                      <AdvancedImage
                        cldImg={myImage}
                        plugins={[placeholder({ mode: "blur" }), responsive()]}
                        className="w-[150px]  border border-[#d2d2d7] object-cover"
                      />
                    </Link>
                  </div>
                  <div className="product-info__container flex w-full basis-[100%] flex-col gap-[5px] ">
                    <Link
                      to={`/products/${item._id}/category/${item.category}`}
                      className=" cart-title text-sm font-semibold md:text-lg lg:text-xl"
                      onClick={toggleCart}
                    >
                      {item.name}
                    </Link>
                    <p className=" text-xs text-gray-500 md:text-base lg:text-lg">
                      {item.size.toUpperCase()}
                    </p>

                    <div className="quantity__container flex   items-center gap-2 ">
                      <button
                        className="flex h-[24px] w-[24px] items-center justify-center border border-[#d2d2d7] "
                        onClick={() =>
                          decreaseQuantityHandler(item._id, item.size)
                        }
                      >
                        -
                      </button>
                      <h5>{item.quantity}</h5>
                      <button
                        className="flex h-[24px] w-[24px] items-center justify-center border border-[#d2d2d7] "
                        onClick={() =>
                          increaseQuantityHandler(item._id, item.size)
                        }
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          removeFromCartHandler(item._id, item.size)
                        }
                      >
                        <MdDeleteOutline size={25} color="#ef4444" />
                      </button>
                    </div>
                  </div>

                  <div className=" flex    basis-[40%] items-end justify-end md:basis-[60%]">
                    <h5 className=" text-sm font-medium text-gray-500 md:text-lg lg:text-lg">
                      {formatPrice(item.price)}
                    </h5>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex h-full flex-col items-center justify-center ">
              <img
                src="https://res.cloudinary.com/dupynxkci/image/upload/v1706777169/vcpjdfxvnk8pkufnwufm.png"
                alt="empty-cart"
                loading="lazy"
                className="mt-5 w-[70%] object-cover object-center md:mt-6 md:w-[50%] lg:w-[50%]"
              />
              <h1 className=" text-2xl font-extrabold lg:text-3xl">
                Your Cart is Empty
              </h1>
            </div>
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div
          className={`fixed bottom-0 right-0 z-[60]  w-full bg-white opacity-100 transition-all duration-300 md:w-[70%] lg:w-1/2 ${
            cartState
              ? "visible translate-x-0 opacity-100"
              : "invisible translate-x-full opacity-0"
          } `}
        >
          {cartItems.length > 0 && (
            <div className="subtotal__container flex  flex-1 items-center justify-between   border-t border-[#d2d2d7] px-4 py-4">
              <h1 className="text-lg font-semibold md:text-lg lg:text-xl">
                Subtotal
              </h1>
              <h1 className="text-base font-semibold md:text-lg lg:text-xl">
                {itemsPrice}
              </h1>
            </div>
          )}
          <div className="shippings-taxes-info__container flex items-center justify-center  border-t border-[#d2d2d7] px-6 py-4">
            <p className="text-center text-sm">
              Shipping & taxes calculated at checkout Free standard shipping
              within Tim Hortons
            </p>
          </div>
          <div className="checkout__container">
            <button
              onClick={checkoutHandler}
              className="button__solid w-full py-3 text-white "
            >
              CHECK OUT
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
