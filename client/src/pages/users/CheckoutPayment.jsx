import { RiShoppingCartLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/cartUtils";
import CheckoutSteps from "../../components/CheckoutSteps";
import { CiLock } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { savePaymentMethod } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import { cld } from "../../utils/cloudinary";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";

const CheckoutPayment = () => {
  const {
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    shippingInformation,
    taxPrice,
    paymentMethod: paymentMethodRedux,
  } = useSelector((state) => state.cart);

  const [orderSummary, setOrderSummary] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(
    paymentMethodRedux || "COD",
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleOrderSummary = () => {
    setOrderSummary(!orderSummary);
  };

  useEffect(() => {
    if (!shippingInformation) {
      navigate("/checkout/shipping");
    }
  }, [shippingInformation, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/checkout/placeorder");
  };

  return (
    <div className="checkout-information__container h-full ">
      <div className="  md:py-16 lg:flex lg:flex-row-reverse  lg:px-0 lg:py-0">
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
            {/* <div className="gift-card__container  border-b border-[#121212] px-4 py-4 pb-8 lg:px-0 ">
              <p className="mb-4 text-sm">
                {" "}
                If you have our gift card, enter the code to get discounts
              </p>
              <input
                placeholder="Gift card code"
                className="input__outline mb-4"
              ></input>
              <button className="button__solid">APPLY</button>
            </div> */}
            <div className="flex flex-col gap-2  border-b border-[#121212] px-4 py-3 lg:px-0">
              <div className="subtotal__container flex flex-1 items-center justify-between   ">
                <h1 className="text-base font-normal md:text-lg lg:text-xl ">
                  Subtotal
                </h1>
                <h1 className="text-base font-normal text-[#808080] md:text-lg lg:text-xl">
                  {itemsPrice}
                </h1>
              </div>
              <div className="subtotal__container flex flex-1 items-center justify-between ">
                <h1 className="text-base font-normal md:text-lg lg:text-xl">
                  Shipping Subtotal
                </h1>
                <h1 className="text-sm font-normal text-[#808080] md:text-lg lg:text-xl">
                  {shippingPrice}
                </h1>
              </div>
              <div className="subtotal__container flex flex-1 items-center justify-between ">
                <h1 className="text-base font-normal md:text-lg lg:text-xl">
                  Tax Subtotal
                </h1>
                <h1 className="text-sm font-normal text-[#808080] md:text-lg lg:text-xl">
                  {taxPrice}
                </h1>
              </div>
            </div>
            <div className="total__container flex flex-1  items-center justify-between bg-[#FAEED1] px-4 py-3 lg:px-0   ">
              <h1 className="text-base font-normal md:text-lg lg:text-xl">
                Total Payment
              </h1>
              <h1 className="text-base font-normal md:text-lg lg:text-xl">
                {totalPrice}
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
              <CheckoutSteps step1 step2 step3 />
            </div>

            <div className="flex flex-col">
              <div className="mt-8 flex items-center justify-between border-b border-[#121212] pb-6">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M9.55156 18.1501L4.22656 12.8251L5.27656 11.7501L9.55156 16.0251L18.7266 6.8501L19.7766 7.9251L9.55156 18.1501Z"
                      fill="#121212"
                    />
                  </svg>
                  <h1 className="text-lg font-medium text-[#424245]">
                    Contact Information
                  </h1>
                </div>
                <Link to="/checkout/information">
                  <FaRegEdit size={18} color="#808080" />
                </Link>
              </div>
              <div className="flex items-center justify-between border-b border-[#121212] pb-6 pt-6">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <path
                      d="M9.55156 18.1501L4.22656 12.8251L5.27656 11.7501L9.55156 16.0251L18.7266 6.8501L19.7766 7.9251L9.55156 18.1501Z"
                      fill="#121212"
                    />
                  </svg>
                  <h1 className="text-lg font-medium text-[#424245]">
                    Shipping Details
                  </h1>
                </div>
                <Link to="/checkout/shipping">
                  <FaRegEdit size={18} color="#808080" />
                </Link>
              </div>
            </div>

            <form className="contact-information mt-6" onSubmit={submitHandler}>
              <h1 className="mb-4 text-lg font-medium">3 Payment</h1>
              <h4 className="mb-3 text-base font-medium">
                Select a Payment Method
              </h4>
              <div className="flex flex-col gap-2">
                <select
                  id="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="input__outline"
                >
                  <option value="COD" className="text-[16px]">
                    COD Payment
                  </option>
                  <option value="PayPal" className="text-[16px] ">
                    PayPal
                  </option>
                </select>
                <button type="submit" className="button__solid mt-3">
                  Continue
                </button>
              </div>
            </form>
          </div>

          <div className="shipping-payment-outline__container flex flex-col px-4 lg:px-0">
            <div className="payment mb-10 border-b  border-[#D2D2D7] md:mb-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;
