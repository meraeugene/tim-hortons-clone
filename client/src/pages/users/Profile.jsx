import { Link, useParams } from "react-router-dom";
import { useState,  } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import {
  useUpdateProfileMutation,
  useResetPasswordMutation,
} from "../../slices/usersApiSlice";
import { useUploadProductImageMutation } from "../../slices/productsApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";
import { logout } from "../../slices/authSlice";
import { formatPrice } from "../../utils/cartUtils";
import CustomPagination from "../../components/CustomPagination";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [imgFilename, setImgFilename] = useState("");

  // RESET PASSWORD
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { pageNumber } = useParams();

  const  userInfo  = useSelector((state) => state.auth.userInfo.data);


  const { data, isLoading } = useGetMyOrdersQuery({
    pageNumber,
  });

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useUpdateProfileMutation();

  const [resetPassword, { isLoading: loadingResetPassword }] =
    useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        firstName,
        lastName,
        image,
        email,
      }).unwrap();
      dispatch(setCredentials(res));
      toast.success(res.message);
      refetch();
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };

  const passwordResetHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        const result = await resetPassword({
          currentPassword,
          newPassword,
        }).unwrap();
        dispatch(logout());
      } catch (error) {
        toast.error(error?.data?.error || error.error || error?.data?.message);
      }
    }
  };

  const [uploadProductImage] = useUploadProductImageMutation();

  const uploadFileHandler = async (e) => {
    const selectedFile = e.target.files[0];

    setImgFilename(selectedFile.name);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };


  return (
    <div className="  px-4 pt-10 md:p-8 lg:p-20">
      {isLoading ? (
        <Loader />
      ) : data?.orders.length > 0 ? (
        <div className="user-order__container  mb-12  md:mb-12 md:mt-0 md:basis-full lg:mb-24 ">
          <div className="mb-10 flex items-center justify-between">
            <h1 className=" text-4xl font-bold">My Orders ({data?.count})</h1>
          </div>

          {data?.orders.length === 0 && (
            <div className="w-[40%]">
              <Message
                variant="info"
                message="No order found for the given search."
              />
            </div>
          )}

          <div className="overflow-auto">
            <table className=" min-w-full border bg-white shadow-md">
              <thead>
                <tr className="whitespace-nowrap bg-gray-100">
                  <th className="px-4 py-2 text-left  font-bold">PRODUCTS</th>
                  <th className="px-4 py-2  text-left font-bold">DATE</th>
                  <th className="px-4 py-2  text-left font-bold">TOTAL</th>
                  <th className="px-4 py-2  text-left font-bold">
                    MODE OF PAYMENT
                  </th>
                  <th className="px-4 py-2  text-left font-bold">PAID</th>
                  <th className="px-4 py-2  text-left font-bold">STATUS</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>

              <tbody>
                {data?.orders.map((order) => (
                  <tr
                    key={order._id}
                    className="whitespace-nowrap hover:bg-gray-50"
                  >
                    <td className=" e px-4  py-2">
                      {order.orderItems[0].name}...
                    </td>
                    <td className="px-4 py-2  ">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-4 py-2  ">
                      {formatPrice(order.totalPrice)}
                    </td>
                    <td className="px-4 py-2">{order.paymentMethod}</td>
                    <td className="px-4 py-2 ">
                      {order.isPaid ? (
                        <div className="w-full  rounded-[4px] border border-[#1add92] bg-green-200 p-2  font-medium text-green-700 ">
                          {order.paidAt.substring(0, 10)}
                        </div>
                      ) : (
                        <div className="w-full rounded-[4px] border border-[#e36868] bg-red-200 p-2 font-medium text-red-700 ">
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
                    <td className="px-4 py-2">
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

          <CustomPagination
            pages={data?.pages}
            page={data?.page}
            isLogin={true}
            myorders={true}
          />
        </div>
      ) : null}
      <div className="edit-profile__container  mb-8 flex flex-col gap-12 md:flex-row">
        <div className="basis-1/2">
          <h1 className="mb-6  text-3xl font-bold">User Profile</h1>

          <form onSubmit={submitHandler}>
            <p className="mb-2 text-sm font-medium">First Name : </p>
            <input
              type="text"
              placeholder="First Name"
              className="input__outline mb-3"
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={userInfo.firstName}
            />
            <p className="mb-2 text-sm font-medium">Last Name : </p>
            <input
              type="text"
              placeholder="Last Name"
              className="input__outline mb-3"
              onChange={(e) => setLastName(e.target.value)}
              defaultValue={userInfo.lastName}
            />
            <p className="mb-2 text-sm font-medium">Email Address: </p>
            <input
              type="text"
              placeholder="Email Address"
              className="input__outline mb-3"
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={userInfo.email}
            />

            <p className="mb-2 text-base  font-medium">Image : </p>

            <label className="img-label mb-3  cursor-pointer" htmlFor="file">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Choose a Image
            </label>

            {imgFilename && (
              <p className=" mt-2  text-base font-medium">
                File name: {imgFilename}
              </p>
            )}

            <input
              type="file"
              name="image"
              id="file"
              onChange={uploadFileHandler}
              className="w-full rounded "
            />

            <p className="mb-2 mt-2 text-sm font-medium">
              Verification Status :{" "}
            </p>
            {userInfo.verified ? (
              <Message variant="success" message="Verified" />
            ) : (
              <Message variant="error" message="Unverified" />
            )}
            <button type="submit" className="button__solid mt-8">
              {loadingUpdateProfile ? (
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
          </form>
        </div>

        <div className="password-security__container mb-6 basis-1/2 md:mt-0">
          <h1 className="mb-6  text-3xl font-bold">Password & Security</h1>

          <form onSubmit={passwordResetHandler}>
            <p className="mb-2 text-sm font-medium">Current Password : </p>
            <input
              type="password"
              className="input__outline mb-3"
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
            />
            <p className="mb-2 text-sm font-medium">New Password : </p>
            <input
              type="password"
              className="input__outline mb-3"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <p className="mb-2 text-sm font-medium">Confirm Password : </p>
            <input
              type="password"
              className="input__outline mb-3"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            <button type="submit" className="button__solid mt-6">
              {loadingResetPassword ? (
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
                <span>CHANGE PASSWORD</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
