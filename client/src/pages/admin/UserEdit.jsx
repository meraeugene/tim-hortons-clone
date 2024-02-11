import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { IoCaretBackOutline } from "react-icons/io5";

const UserEdit = () => {
  const { id: userId } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState(0);
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdateUser }] =
    useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({
        userId,
        firstName,
        lastName,
        email,
        isAdmin,
      });
      toast.success(res.data.message);
      refetch();
      navigate("/admin/userlist");
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };

  return (
    <div className="p-20 pt-14">
      <Link
        to="/admin/userlist"
        className="flex  w-[100px]  items-center gap-1 border border-[#d2d2d7] bg-white p-2 text-sm transition duration-300 ease-in-out hover:bg-[#121212] hover:text-white"
      >
        <IoCaretBackOutline />
        Go Back
      </Link>
      <div className="flex flex-col items-center justify-center  ">
        <h1 className="mb-10 mt-8 text-4xl font-extrabold uppercase">
          Update User
        </h1>

        <form className=" w-1/2" onSubmit={submitHandler}>
          <p className="mb-2 text-base font-medium">First Name : </p>
          <input
            type="text"
            className="input__outline mb-5"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <p className="mb-2 text-base  font-medium">Last Name : </p>
          <input
            type="text"
            placeholder="0"
            className="input__outline mb-5"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />

          <p className="mb-2 text-base  font-medium">Email : </p>
          <input
            type="text"
            placeholder="0"
            className="input__outline mb-5"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => setIsAdmin(e.target.checked)}
              checked={isAdmin}
            />
            <p className=" text-base  font-medium">Admin Status </p>
          </div>

          <button type="submit" className="button__solid mt-8">
            {loadingUpdateUser ? (
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
    </div>
  );
};

export default UserEdit;
