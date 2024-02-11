import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps";
import Loader from "../../components/Loader";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
import { clearCartItems } from "../../slices/cartSlice";
import { formatPrice } from "../../utils/cartUtils";
import { CiLock } from "react-icons/ci";
import { toast } from "react-toastify";
import { parsePrice } from "../../utils/parsePrice";
import { cld } from "../../utils/cloudinary";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";

const CheckoutPlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const {
    shippingInformation,
    paymentMethod,
    cartItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
    taxPrice,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingInformation) {
      navigate("/checkout/shipping");
    } else if (!paymentMethod) {
      navigate("/checkout/payment");
    }
  }, [shippingInformation, paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
        shippingInformation,
        paymentMethod,
        itemsPrice: parsePrice(itemsPrice),
        shippingPrice: parsePrice(shippingPrice),
        taxPrice: parsePrice(taxPrice),
        totalPrice: parsePrice(totalPrice),
      }).unwrap();
      const { order, message } = res;
      toast.success(message);
      dispatch(clearCartItems());
      navigate(`/order/${order._id}`);
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };

  if (error) {
    toast.error(error?.data?.error || error.error || error?.data?.message);
  }

  return (
    <div className="checkout-information__container h-full ">
      <div className="   md:py-16 lg:flex lg:flex-row  lg:px-0 lg:py-0">
        <div className="left__container basis-1/2 md:px-20 lg:sticky lg:top-[72px] lg:h-full lg:px-20 lg:py-10 ">
          <div className="border-t-0 border-[#121212]   md:border-t-0 lg:border-0 lg:px-0 lg:pt-0">
            <div className=" px-4  py-6 ">
              <CheckoutSteps step1 step2 step3 step4 />
            </div>

            <div>
              <h1 className="border-y   border-[#121212] bg-[#FAEED1]  px-4 py-2 text-lg font-semibold">
                Personal Information
              </h1>
              <div className="flex flex-col gap-2  px-4 py-4">
                <p className="text-[15px] lg:text-lg">
                  <span className=" font-semibold">First Name:</span>{" "}
                  {shippingInformation.firstName}
                </p>
                <p className="text-[15px] lg:text-lg">
                  <span className=" font-semibold">Last Name:</span>{" "}
                  {shippingInformation.lastName}
                </p>
                <p className="text-[15px] lg:text-lg">
                  <span className=" font-semibold">Email:</span>{" "}
                  {shippingInformation.email}
                </p>
                <p className="text-[15px] lg:text-lg">
                  <span className=" font-semibold">Phone Number:</span>{" "}
                  {shippingInformation.phoneNumber}
                </p>
              </div>
            </div>

            <div>
              <h1 className="border-y  border-[#121212] bg-[#FAEED1]  px-4 py-2 text-lg font-semibold">
                Shipping Information
              </h1>
              <div className="flex flex-col gap-2  px-4 py-4">
                <p className="text-[15px] lg:text-lg">
                  <span className=" font-semibold">Address:</span>{" "}
                  {shippingInformation.address}
                </p>
                <p className="text-[15px] lg:text-lg">
                  <span className=" font-semibold">Street:</span>{" "}
                  {shippingInformation.street}
                </p>
                <p className="text-[15px] lg:text-lg">
                  <span className=" font-semibold">City:</span>{" "}
                  {shippingInformation.city}
                </p>
                <p className="text-[15px] lg:text-lg">
                  <span className=" font-semibold">Postal Code:</span>{" "}
                  {shippingInformation.postalCode}
                </p>
                <p className="text-[15px] lg:text-lg">
                  <span className=" font-semibold">Country:</span>{" "}
                  {shippingInformation.country}
                </p>
              </div>
            </div>

            <div>
              <h1 className="border-y  border-b-0 border-[#121212] bg-[#FAEED1] px-4 py-2 text-lg ">
                <span className="font-semibold ">Payment Method:</span>{" "}
                {paymentMethod.toUpperCase()}
              </h1>
            </div>
          </div>
        </div>

        <div className=" accordion-order-summary__container right__container basis-1/2 md:px-20 lg:border-l lg:border-[#121212] lg:px-20 lg:py-16">
          <div>
            <div>
              <h1 className=" border-b border-t border-[#121212] p-4 text-sm  font-medium  text-[#121212] lg:border-0 lg:p-0">
                ORDER SUMMARY
              </h1>

              {cartItems.map((item, index) => {
                const myImage = cld.image(item.image);

                return (
                  <div
                    className={`lg:content show  flex w-full items-center gap-3 border-b border-[#121212]  bg-[#FAEED1]  px-4 py-3 lg:gap-4   lg:border-0 lg:bg-inherit  lg:px-0 `}
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

                    <div className=" z flex  basis-[40%] items-end justify-end md:basis-[60%]">
                      <h5 className=" text-sm font-medium text-gray-500 md:text-lg lg:text-lg">
                        {formatPrice(item.price / item.quantity)}
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2  border-b border-[#121212] px-4 py-3 lg:px-0">
              <div className="subtotal__container flex flex-1 items-center justify-between  lg:border-t lg:border-[#121212] lg:pt-4 ">
                <h1 className="text-base font-normal md:text-lg lg:text-xl">
                  Subtotal
                </h1>
                <h1 className="text-base font-normal md:text-lg lg:text-xl">
                  {itemsPrice}
                </h1>
              </div>
              <div className="subtotal__container flex flex-1 items-center justify-between ">
                <h1 className="text-base font-normal md:text-lg lg:text-xl">
                  Shipping Subtotal
                </h1>
                <h1 className="text-base font-normal md:text-lg lg:text-xl">
                  {shippingPrice}
                </h1>
              </div>
              <div className="subtotal__container flex flex-1 items-center justify-between ">
                <h1 className="text-base font-normal md:text-lg lg:text-xl">
                  Tax Subtotal
                </h1>
                <h1 className="text-base font-normal md:text-lg lg:text-xl">
                  {taxPrice}
                </h1>
              </div>
            </div>
            <div className="total__container vbor flex  flex-1 items-center justify-between px-4 py-3 lg:px-0  ">
              <h1 className="text-base font-normal md:text-lg lg:text-xl">
                Total Payment
              </h1>
              <h1 className="text-base font-normal md:text-lg lg:text-xl">
                {totalPrice}
              </h1>
            </div>
            <button
              type="submit"
              className="button__solid  mt-4"
              disabled={cartItems.length === 0}
              onClick={placeOrderHandler}
            >
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
                <span> PLACE ORDER</span>
              )}
            </button>
            <div className="mb-4 mt-12 flex items-center justify-center gap-2 md:mb-8 lg:mb-0">
              <p className="text-sm font-normal">Secure Checkout</p>
              <CiLock color="#121212" size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPlaceOrder;
