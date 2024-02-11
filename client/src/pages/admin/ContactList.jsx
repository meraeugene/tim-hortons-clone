import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
} from "../../slices/contactsApiSlice";
import CustomPagination from "../../components/CustomPagination";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GoShare } from "react-icons/go";
import { SlOptions } from "react-icons/sl";
import { useState } from "react";
import { toast } from "react-toastify";

const ContactList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetContactsQuery({
    pageNumber,
  });

  const [deleteContact, { isLoading: loadingDeleteContact }] =
    useDeleteContactMutation();

  const [optionsState, setOptionsState] = useState({});

  const toggleOptions = (contactId) => {
    setOptionsState((prevState) => ({
      ...prevState,
      [contactId]: !prevState[contactId],
    }));
  };

  const deleteContactHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product")) {
      try {
        const res = await deleteContact(id);
        toast.success(res.data.message);
        refetch();
      } catch (error) {
        toast.error(error?.data?.error || error.error || error?.data?.message);
      }
    }
  };

  return (
    <div className="flex flex-col px-4 py-10 md:flex-row md:flex-wrap md:p-8 lg:flex-col lg:p-20">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          variant="error"
          message={error?.data?.error || error.error || error?.data?.message}
        />
      ) : (
        <>
          {data?.contacts && (
            <div className="mb-10 flex w-full items-center justify-between">
              <div>
                <h1 className=" text-4xl font-bold">
                  Contacts ({data?.count})
                </h1>
              </div>
            </div>
          )}

          {data?.contacts.length > 0 && (
            <div className="mb-4 grid grid-cols-1 gap-8 md:grid-cols-3   lg:grid-cols-4">
              {data?.contacts.map((contact) => (
                <div key={contact._id}>
                  <div className="flex  h-full flex-col gap-1 border  bg-white p-4 shadow-md transition duration-300 ease-in-out hover:shadow-lg">
                    <div className="relative flex items-center justify-between">
                      <h1>
                        <span className="font-semibold">Name:</span>{" "}
                        {contact.name}
                      </h1>
                      <SlOptions
                        className=" cursor-pointer text-gray-900 transition-all duration-300 ease-in-out hover:text-gray-500"
                        onClick={() => toggleOptions(contact._id)}
                      />
                      {optionsState[contact._id] && (
                        <div className="contact-options__container  absolute bottom-[-85px] right-[0px] min-w-[130px] border  bg-white shadow-lg">
                          <div className=" flex cursor-pointer  items-center gap-2 border-b  border-[#d2d2d7]  px-3 py-2 transition-all duration-300 ease-in-out  hover:bg-gray-500 hover:text-white">
                            <GoShare />
                            Share
                          </div>
                          <div
                            className=" flex cursor-pointer   items-center gap-2 px-3 py-2 text-red-500 transition-all duration-300  ease-in-out hover:bg-red-200 hover:font-bold "
                            onClick={() => deleteContactHandler(contact._id)}
                          >
                            <FaTrash />
                            Delete
                          </div>
                        </div>
                      )}
                    </div>

                    <h1>
                      {" "}
                      <span className="font-semibold">Email:</span>{" "}
                      {contact.email}
                    </h1>
                    <h1>
                      {" "}
                      <span className="font-semibold">Message:</span>{" "}
                      {contact.message}
                    </h1>

                    <h1>
                      <span className="font-semibold">Date:</span>{" "}
                      {contact.createdAt.substring(0, 10)}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          )}

          {data?.contacts.length > 0 && (
            <CustomPagination
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              contact={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
