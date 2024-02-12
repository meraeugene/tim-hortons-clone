import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderStatusMutation,
  useUpdateCodOrderToPaidMutation,
} from "../../slices/ordersApiSlice";
import { IoCaretBackOutline } from "react-icons/io5";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderEdit = () => {
  const { id: orderId } = useParams();
  const [status, setStatus] = useState("");
  const [paid, setPaid] = useState("");

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [updateOrderStatus, { isLoading: loadingUpdateOrderStatus }] =
    useUpdateOrderStatusMutation();

  const [updateCodOrderToPaid, { isLoading: loadingUpdateCodOrderToPaid }] =
    useUpdateCodOrderToPaidMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await updateOrderStatus({ orderId, status });

      if (result.error) {
        toast.error(result.error.data.message);
      } else {
        toast.success(result.data.message);
        refetch();
        navigate("/admin/orderlist");
      }
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };

  const updateOrderToPaidHandler = async () => {
    try {
      const result = await updateCodOrderToPaid({ orderId });

      if (result.error) {
        toast.error(result.error.data.message);
      } else {
        toast.success(result.data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message
      variant="error"
      message={error?.data?.error || error.error || error?.data?.message}
    />
  ) : (
    <div className="p-4 md:p-20 py-14">
      <Link
        to="/admin/orderlist"
        className="flex  w-[100px]  items-center gap-1 border border-[#d2d2d7] bg-white p-2 text-sm transition duration-300 ease-in-out hover:bg-[#121212] hover:text-white"
      >
        <IoCaretBackOutline />
        Go Back
      </Link>
      <div className="mx-auto flex w-full lg:w-1/2 flex-col items-start  md:items-center  justify-center ">
        <h1 className="mb-10 mt-8  text-4xl font-extrabold uppercase">
          Update Order
        </h1>

        <p className="mb-2 w-full text-base font-medium">Mode of Payment : </p>
        <div className="mb-5  w-full rounded-[4px] border border-[#1add92] bg-green-200 p-2 font-medium text-green-700 ">
          {order.paymentMethod}
        </div>

        <div className="w-full">
          <p className="mb-2 text-base  font-medium">Status : </p>
          <select
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className="mb-5 h-[48px] w-full cursor-pointer border border-[#d2d2d7] outline-none"
          >
            <option value="" hidden>
              Select Status..
            </option>
            <option value="Order Placed">Order Placed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Failed Delivery Attempt">
              Failed Delivery Attempt
            </option>
          </select>
        </div>

        <div className="w-full">
          <p className="mb-2 text-base  font-medium">Paid Status: </p>

          {order.isPaid ? (
            <div className=" rounded-[4px] border border-[#1add92] bg-green-200 p-2 font-medium text-green-700">
              {`Paid at ${order.paidAt.substring(0, 10)}`}
            </div>
          ) : (
            <div className="rounded-[4px] border border-[#e36868] bg-red-200 p-2 font-medium text-red-700">
              Not Paid
            </div>
          )}
        </div>

        <div className=" mt-8 flex w-full flex-col gap-6">
          {order.paymentMethod === "COD" && !order.isPaid && (
            <button
              className="button__outline"
              disabled={loadingUpdateCodOrderToPaid}
              onClick={updateOrderToPaidHandler}
            >
              {loadingUpdateCodOrderToPaid ? (
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
                <span> Update Order To Paid</span>
              )}
            </button>
          )}

          <button
            className="button__solid "
            onClick={submitHandler}
            disabled={loadingUpdateOrderStatus}
          >
            {loadingUpdateOrderStatus ? (
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
              <span>UPDATE</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderEdit;
