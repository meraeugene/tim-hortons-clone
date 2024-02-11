import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import CustomPagination from "../../components/CustomPagination";
import { CiSearch } from "react-icons/ci";

const UserList = () => {
  const { pageNumber } = useParams();
  const [keyword, setKeyword] = useState("");

  const { data, isLoading, error, refetch } = useGetUsersQuery({
    keyword,
    pageNumber,
  });

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const res = await deleteUser(id);

      if (res.error?.status === 404) {
        toast.error(res.error?.data?.message);
      } else {
        toast.success(res.data?.message);
        refetch();
      }
    }
  };

  return (
    <div className="flex flex-col   px-4 py-10 md:flex-row  md:flex-wrap  md:p-8 lg:flex-col lg:px-20 lg:py-10">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <>
          {data?.users && (
            <div className="mb-10 flex w-full flex-col  gap-6">
              <h1 className=" text-4xl font-bold">Users ({data?.count})</h1>
              <form
                className=" flex  w-full items-center border   bg-white shadow-md hover:shadow-lg md:w-1/2 lg:w-[20%] "
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="p-2 pr-0">
                  <CiSearch size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search a user by name"
                  value={keyword}
                  onChange={handleSearch}
                  className=" h-[40px] flex-grow  px-2 focus:outline-none"
                />
              </form>
            </div>
          )}
          {data?.users.length === 0 && (
            <Message
              variant="info"
              message="No users found for the given search."
            />
          )}
          {data?.users.length > 0 && (
            <div className="overflow-auto">
              <table className=" min-w-full border bg-white shadow-md ">
                <thead>
                  <tr className="whitespace-nowrap bg-gray-100">
                    <th className="px-4 py-2  text-left font-bold">
                      FIRST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">
                      LAST NAME
                    </th>
                    <th className="px-4 py-2  text-left font-bold">EMAIL</th>
                    <th className=" px-4  py-2 text-left font-bold">
                      VERIFIED
                    </th>
                    <th className=" px-4  py-2 text-left font-bold">
                      ADMIN STATUS
                    </th>
                    <th className=" px-4  py-2 text-left font-bold">
                      REMIND STATUS
                    </th>

                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.users?.map((user) => (
                    <tr
                      key={user._id}
                      className="whitespace-nowrap hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{user.firstName}</td>

                      <td className="px-4 py-2">{user.lastName}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">
                        {user.verified ? (
                          <div className="rounded-[4px] border border-[#1add92] bg-green-200 p-2 text-center font-medium text-green-700">
                            YES
                          </div>
                        ) : (
                          <div className="rounded-[4px] border border-[#e36868] bg-red-200 p-2 text-center font-medium text-red-700">
                            NO
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {user.isAdmin ? (
                          <div className="rounded-[4px] border border-[#1add92] bg-green-200 p-2 text-center font-medium text-green-700">
                            YES
                          </div>
                        ) : (
                          <div className="rounded-[4px] border border-[#e36868] bg-red-200 p-2 text-center font-medium text-red-700">
                            NO
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        {user.remindStatus ? (
                          <div className="rounded-[4px] border border-[#1add92] bg-green-200 p-2 text-center font-medium text-green-700">
                            YES
                          </div>
                        ) : (
                          <div className="rounded-[4px] border border-[#e36868] bg-red-200 p-2 text-center font-medium text-red-700">
                            NO
                          </div>
                        )}
                      </td>
                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <button className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100">
                            <FaRegEdit color="green" />
                          </button>
                        </Link>
                        <button
                          className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash color="red" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data.users.length > 0 && (
            <CustomPagination
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              user={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserList;
