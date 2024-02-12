import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { formatPrice } from "../../utils/cartUtils";
import { CiSearch } from "react-icons/ci";
import CustomPagination from "../../components/CustomPagination";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

const OrderList = () => {
  const { pageNumber } = useParams();
  const [keyword, setKeyword] = useState("");

  const { data, isLoading, error } = useGetOrdersQuery({
    pageNumber,
  });

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="flex flex-col   px-4 py-10 md:flex-row  md:flex-wrap  md:p-8 lg:flex-col lg:px:10 lg:py-10">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          variant="error"
          message={error?.data?.error || error.error || error?.data?.message}
        />
      ) : (
        <>
          {data?.orders && (
            <div className="mb-10 flex w-full flex-col  gap-6 ">
              <h1 className=" text-4xl font-bold">Orders ({data?.count})</h1>
            </div>
          )}

          {data.orders.length === 0 && (
            <div className="w-full md:w-1/2">
              <Message
                variant="info"
                message="No order found for the given search."
              />
            </div>
          )}

          {data.orders.length > 0 && (
            <div className="overflow-auto ">
              <table className="    border bg-white shadow-md">
                <thead>
                  <tr className=" whitespace-nowrap bg-gray-100">
                    <th className="px-4 py-2 text-left  font-bold">PRODUCTS</th>
                    <th className="px-4 py-2 text-left  font-bold">NAME</th>

                    <th className="px-4 py-2  text-left font-bold">
                      PHONE NUMBER
                    </th>
                    <th className="px-4 py-2  text-left font-bold">DATE</th>
                    <th className="px-4 py-2  text-left font-bold">TOTAL</th>
                    <th className="px-4 py-2  text-left font-bold">MOP</th>
                    <th className="px-4 py-2  text-left font-bold">PAID</th>
                    <th className="px-4 py-2  text-left font-bold">STATUS</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.orders.map((order) => (
                    <tr
                      key={order._id}
                      className="whitespace-nowrap  hover:bg-gray-50"
                    >
                      <td className=" px-4 py-2">{order.orderItems[0].name}</td>
                      <td className="px-4 py-2">
                    
                    
  {capitalizeFirstLetter(order.user.firstName)}{' '}
  {capitalizeFirstLetter(order.user.lastName)}

                      </td>

                      <td className="px-4 py-2">
                        {order.shippingInformation.phoneNumber}
                      </td>
                      <td className="px-4 py-2">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="px-4 py-2">
                        {formatPrice(order.totalPrice)}
                      </td>
                      <td className="px-4 py-2">{order.paymentMethod}</td>
                      <td className="px-4 py-2">
                        {order.isPaid ? (
                          <div className="rounded-[4px] border border-[#1add92] bg-green-200 p-2 font-medium text-green-700">
                            {`Paid at ${order.paidAt.substring(0, 10)}`}
                          </div>
                        ) : (
                          <div className="rounded-[4px] border border-[#e36868] bg-red-200 p-2 font-medium text-red-700">
                            Not Paid
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <div
                          className={`rounded-[4px] border p-2 font-medium ${
                            order.status === "Order Placed"
                              ? "border-blue-500 bg-blue-200 text-blue-800"
                              : order.status === "Processing"
                                ? "border-yellow-500 bg-yellow-200 text-yellow-800"
                                : order.status === "Shipped"
                                  ? "border-green-500 bg-green-200 text-green-800"
                                  : order.status === "In Transit"
                                    ? "border-purple-500 bg-purple-200 text-purple-800"
                                    : order.status === "Out for Delivery"
                                      ? "border-emerald-500 bg-emerald-200 text-emerald-800"
                                      : order.status === "Delivered"
                                        ? "border-emerald-500 bg-emerald-200 text-emerald-800"
                                        : "border-red-500 bg-red-200 text-red-800"
                          }`}
                        >
                          {order.status === "Delivered"
                            ? `Delivered at ${order.deliveryDate.substring(
                                0,
                                10,
                              )}`
                            : order.status}
                        </div>
                      </td>

                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <Link to={`/admin/order/${order._id}/edit`}>
                          <button className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100">
                            <FaRegEdit color="green" />
                          </button>
                        </Link>
                        <button
                          className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100"
                          onClick={() => deleteProductHandler(order._id)}
                        >
                          <FaTrash color="red" />
                        </button>

                        <Link to={`/order/${order._id}`}>
                          <button className="btn-sm rounded bg-gray-200 px-2 py-1 hover:bg-gray-300">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data.orders.length > 0 && (
            <CustomPagination
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              order={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OrderList;
