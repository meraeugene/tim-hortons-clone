import { RiShoppingCartLine } from "react-icons/ri";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/cartUtils";
import CheckoutSteps from "../../components/CheckoutSteps";
import { CiLock } from "react-icons/ci";
import { saveShippingInformation } from "../../slices/cartSlice";
import { toast } from "react-toastify";
import { cld } from "../../utils/cloudinary";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";

const CheckoutInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, itemsPrice, shippingInformation } = useSelector(
    (state) => state.cart,
  );

  const userData = useSelector((state) => state.auth.userInfo.data);

  const [orderSummary, setOrderSummary] = useState(true);

  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    shippingInformation?.phoneNumber || "",
  );

  const toggleOrderSummary = () => {
    setOrderSummary(!orderSummary);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingInformation({ firstName, lastName, email, phoneNumber }),
    );
    if (firstName && lastName && email && phoneNumber) {
      navigate("/checkout/shipping");
    } else {
      toast.error("Please ensure all required fields are filled out.");
    }
  };

  return (
    <div className="checkout-information__container h-full ">
      <div className="  md:flex-col md:py-16 lg:flex lg:flex-row-reverse  lg:px-0 lg:py-0">
        <div className="accordion-order-summary__container right__container basis-1/2 md:px-20 lg:border-l lg:border-[#121212] lg:px-20 lg:py-10">
          <div
            className="flex items-center justify-start gap-3 bg-[#FAEED1] px-4 py-6 lg:hidden lg:bg-inherit lg:py-0 lg:pt-0"
            onClick={toggleOrderSummary}
          >
            <RiShoppingCartLine color="#121212" size={18} />
            <h1 className="  text-sm font-medium lg:mb-2 lg:hidden">
              Show order summary
            </h1>
            {orderSummary ? (
              <FaAngleUp color="#121212" size={16} />
            ) : (
              <FaAngleDown color="#121212" size={16} />
            )}
          </div>
          <h1 className=" hidden text-sm font-medium lg:mb-2 lg:block">
            ORDER SUMMARY
          </h1>

          <div
            className={`order-summary-content__container lg:max-h-full ${
              orderSummary ? "content show" : "content"
            }`}
          >
            <div>
              {cartItems.map((item, index) => {
                const myImage = cld.image(item.image);

                return (
                  <div
                    className={`lg:content show  flex w-full items-center gap-3 border-b border-[#121212]  bg-[#FAEED1] px-4  py-3 lg:gap-4 lg:border-0   lg:bg-inherit lg:px-0 ${
                      index === 0 ? "border-t border-[#121212]" : ""
                    }    ${orderSummary ? "content show" : "content"}`}
                    key={`${item._id}_${index}`}
                  >
                    <Link
                      to={`/products/${item._id}/category/${item.category}`}
                      className="img__container basis-[40%]"
                    >
                      <AdvancedImage
                        cldImg={myImage}
                        plugins={[placeholder({ mode: "blur" }), responsive()]}
                        className="w-[150px]  border border-[#121212] object-cover"
                      />
                    </Link>
                    <div className="product-info__container flex w-full basis-[100%] flex-col gap-[3px] md:gap-[5px]">
                      <Link
                        to={`/products/${item._id}/category/${item.category}`}
                        className=" cart-title text-sm font-semibold md:text-lg lg:text-xl"
                      >
                        {item.name}
                      </Link>
                      <p className=" text-xs text-gray-500 md:text-base lg:text-lg">
                        {item.size.toUpperCase()}
                      </p>
                      <p className=" text-xs text-gray-500 md:text-base lg:text-lg">
                        Quantity ({item.quantity})
                      </p>
                    </div>

                    <div className=" flex    basis-[40%] items-end justify-end md:basis-[60%]">
                      <h5 className=" text-sm font-medium text-gray-500 md:text-lg lg:text-lg">
                        {formatPrice(item.price / item.quantity)}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2  border-b border-[#121212] px-4 py-3 lg:px-0">
              <div className="subtotal__container flex flex-1 items-center justify-between   ">
                <h1 className="text-sm font-normal md:text-lg lg:text-xl">
                  Subtotal
                </h1>
                <h1 className="text-base font-normal md:text-lg lg:text-xl">
                  {itemsPrice}
                </h1>
              </div>
              <div className="subtotal__container flex flex-1 items-center justify-between ">
                <h1 className="text-sm font-normal md:text-lg lg:text-xl">
                  Shipping Subtotal
                </h1>
                <h1 className="text-xs font-normal text-[#808080] md:text-lg lg:text-xl">
                  Calculated at next step{" "}
                </h1>
              </div>
            </div>
            <div className="total__container flex flex-1  items-center justify-between px-4 py-3 lg:px-0   ">
              <h1 className="text-base font-normal md:text-lg lg:text-xl">
                Total Payment
              </h1>
              <h1 className="text-base font-normal md:text-lg lg:text-xl">
                {itemsPrice}
              </h1>
            </div>
            <div className="mb-4 mt-12 flex items-center justify-center gap-2 md:mb-8 lg:mb-0">
              <p className="text-sm font-normal">Secure Checkout</p>
              <CiLock color="#121212" size={18} />
            </div>
          </div>
        </div>

        <div className="hidden md:block md:h-[1px] md:w-full md:bg-[#121212] lg:hidden"></div>

        <div className="left__container basis-1/2 md:px-20 lg:sticky lg:top-[72px] lg:h-full lg:px-20 lg:py-10 ">
          <div className="border-t border-[#121212] px-4 py-10 pb-6  md:border-t-0 lg:border-0 lg:px-0 lg:pt-0">
            <div>
              <CheckoutSteps step1 />
            </div>

            <div className="contact-information mt-6">
              <h1 className="mb-4 text-lg font-medium">
                1 Contact Information
              </h1>
              <form onSubmit={submitHandler}>
                <p className="mb-2 text-sm font-medium">First Name : </p>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input__outline mb-3"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <p className="mb-2 text-sm font-medium">Last Name : </p>

                <input
                  type="text"
                  placeholder="Your Name"
                  className="input__outline"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
                <p className="mb-2 mt-3 text-sm font-medium">Email : </p>

                <input
                  type="email"
                  placeholder="Your Email"
                  className="input__outline my-3"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <p className="mb-2 text-sm font-medium">Phone number : </p>

                <input
                  type="text"
                  placeholder="Your Phone number *"
                  className="input__outline"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
                <button type="submit" className="button__solid mt-6">
                  CONTINUE TO SHIPPING
                </button>
              </form>
            </div>
          </div>

          <div className="shipping-payment-outline__container flex flex-col  px-4">
            <div className="shipping-details border-t  border-[#D2D2D7] py-6">
              <h1 className="text-lg font-medium text-[#D2D2D7]">
                2 Shipping Details
              </h1>
            </div>
            <div className="payment mb-10 border-b border-t border-[#D2D2D7] py-6 md:mb-0">
              <h1 className="text-lg font-medium text-[#D2D2D7]">3 Payment</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutInformation;
