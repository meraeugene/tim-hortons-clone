import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../../slices/ordersApiSlice";
import { toast } from "react-toastify";
import Message from "../../components/Message";
import { formatPrice } from "../../utils/cartUtils";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { cld } from "../../utils/cloudinary";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: paypal.clientId,
            currency: "PHP",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        const res = await payOrder({ orderId, details }).unwrap();
        refetch();
        console.log(res)
        toast.success(res.message);
      } catch (error) {
        toast.error(error?.data?.error || error.error || error?.data?.message);
      }
    });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment Succesfull");
  };

  const onError = (err) => {
    toast.error(err.message);
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message
      variant="error"
      message={error?.data?.error || error.error || error?.data?.message}
    />
  ) : (
    <div className=" py-6 md:p-20  lg:flex lg:p-0">
      <div className="left-col__container lg:sticky lg:top-[72px] lg:h-full lg:basis-1/2  lg:px-20 lg:py-16 lg:pb-24 ">
        <h1 className="px-4 text-xl font-bold md:mb-8 md:px-0 md:text-3xl">
          Order {orderId}
        </h1>
        <div className="shipping__container px-4 md:px-0">
          <h1 className="mb-2 mt-3 text-xl font-semibold ">Shipping</h1>
          <div className="flex flex-col gap-1">
            <h1 className="md:text-lg ">
              <span className="font-semibold "> Name: </span>
              {order.user.firstName} {order.user.lastName}
            </h1>
            <h1 className="md:text-lg ">
              <span className="font-semibold"> Phone Number: </span>{" "}
              {order.shippingInformation.phoneNumber}
            </h1>
            <h1 className="md:text-lg ">
              <span className="font-semibold"> Email: </span> {order.user.email}
            </h1>
            <h1 className="md:text-lg ">
              <span className="font-semibold"> Address: </span>{" "}
              {order.shippingInformation.address}{" "}
              {order.shippingInformation.street}{" "}
              {order.shippingInformation.city}{" "}
              {order.shippingInformation.postalCode}{" "}
              {order.shippingInformation.country}
            </h1>
          </div>
          <div className="mt-4">
            {order.isDelivered ? (
              <Message
                variant="success"
                message={`Delivered on ${order.deliveredAt.substring(0, 10)}`}
              />
            ) : (
              <Message variant="error" message="Not Delivered" />
            )}
          </div>
        </div>

        <div className=" payment-method__container mt-8 border-t border-[#121212] px-4 pt-3 md:px-0 lg:px-0">
          <h1 className="mb-2  text-xl font-semibold">Payment Method</h1>
          <h1 className="md:text-lg ">
            <span className="font-semibold"> Method: </span>
            {order.paymentMethod.toUpperCase()}
          </h1>
          <div className="mt-4">
            {order.isPaid ? (
              <Message
                variant="success"
                message={`Paid on ${order.paidAt.substring(0, 10)}`}
              />
            ) : (
              <Message variant="error" message="Not Paid" />
            )}
          </div>
        </div>
      </div>

      <div className=" order-items__container mt-8 px-4 md:px-0 lg:mt-0 lg:basis-1/2 lg:border-l lg:border-[#121212] lg:px-20 lg:py-16">
        <h1 className="mb-4  px-4 text-xl font-semibold md:px-0 lg:text-3xl">
          Order Items
        </h1>

        {order &&
          order.orderItems.map((item, index) => {
            const myImage = cld.image(item.image);

            return (
              <div
                className={`lg:content show  flex w-full items-center gap-2 bg-[#FAEED1]  px-4  py-3 md:gap-6 lg:gap-4   lg:border-0 lg:bg-inherit  lg:px-0 `}
                key={`${item._id}_${index}`}
              >
                <div className="img__container basis-[20%]">
                  <Link to={`/products/${item._id}/category/${item.category}`}>
                    <AdvancedImage
                      cldImg={myImage}
                      plugins={[placeholder({ mode: "blur" }), responsive()]}
                      className="w-full  border border-[#121212] object-cover"
                    />
                  </Link>
                </div>
                <div className="product-info__container flex w-full basis-[60%] flex-col gap-[3px] md:gap-[5px] ">
                  <Link
                    className=" cart-title text-sm font-semibold md:text-lg
                    lg:text-xl"
                    to={`/products/${item._id}/category/${item.category}`}
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-500 md:text-base lg:text-lg">
                    {item.size ? item.size.toUpperCase() : "N/A"}
                  </p>

                  <p className=" text-xs text-gray-500 md:text-base lg:text-lg">
                    Quantity ({item.quantity})
                  </p>
                </div>

                <div className=" flex    basis-[20%] items-end justify-end md:basis-[20%]">
                  <h5 className=" text-sm font-medium text-gray-500 md:text-lg lg:text-lg">
                    {formatPrice(item.price)}
                  </h5>
                </div>
              </div>
            );
          })}

        <div className="flex flex-col gap-2 border-b border-[#121212] py-3 md:px-0 lg:mt-4 lg:border-t lg:border-[#121212]  lg:pt-4">
          <div className="subtotal__container flex flex-1 items-center justify-between   ">
            <h1 className="text-base font-normal md:text-lg lg:text-xl">
              Subtotal
            </h1>
            <h1 className="text-base font-normal md:text-lg lg:text-xl">
              {formatPrice(order.itemsPrice)}
            </h1>
          </div>
          <div className="subtotal__container flex flex-1 items-center justify-between ">
            <h1 className="text-base font-normal md:text-lg lg:text-xl">
              Shipping Subtotal
            </h1>
            <h1 className="text-base font-normal md:text-lg lg:text-xl">
              {formatPrice(order.shippingPrice)}
            </h1>
          </div>
          <div className="subtotal__container flex flex-1 items-center justify-between ">
            <h1 className="text-base font-normal md:text-lg lg:text-xl">
              Tax Subtotal
            </h1>
            <h1 className="text-base font-normal md:text-lg lg:text-xl">
              {formatPrice(order.taxPrice)}
            </h1>
          </div>
        </div>
        <div className="total__container vbor flex  flex-1 items-center justify-between py-3  ">
          <h1 className="text-base font-normal md:text-lg lg:text-xl">
            Total Payment
          </h1>
          <h1 className="text-base font-normal md:text-lg lg:text-xl">
            {formatPrice(order.totalPrice)}
          </h1>
        </div>

        {!order.isPaid &&
          order.paymentMethod !== "COD" &&
          order.paymentMethod === "PayPal" && (
            <div className="mt-8">
            
                <div>
                  {/* <button
                    onClick={onApproveTest}
                    className="button__outline my-6"
                  >
                    Test Pay Order
                  </button> */}
                  <div>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                </div>
              
            </div>
          )}
      </div>
    </div>
  );
};

export default Order;
