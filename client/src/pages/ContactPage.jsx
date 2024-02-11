import React, { useState } from "react";
import { useCreateContactMutation } from "../slices/contactsApiSlice";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [createContact, { isLoading: loadingCreateContact }] =
    useCreateContactMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createContact({
        name,
        email,
        message,
      }).unwrap();

      toast.success(res.message);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className=" pb-8 pt-0 lg:p-20">
      <div className="flex flex-col gap-4 md:gap-8 lg:flex-row lg:gap-0">
        <div className="left__container basis-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15445.095849559544!2d120.9680986404419!3d14.583458857111353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca27508e8683%3A0x7ec34cbce0657bc4!2sTim%20Hortons!5e0!3m2!1sen!2sph!4v1707034963890!5m2!1sen!2sph"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="right__container mx-4 mt-4 basis-1/2 border p-4  pb-12 shadow-md md:mx-12 md:mb-6 md:border md:p-8 lg:mt-0">
          <h1 className="mb-4 text-3xl font-extrabold">CONTACT US </h1>
          <div className="flex flex-col gap-2">
            <h1>
              <span className="font-bold">Address: </span>
              1007 United Nations Ave, Ermita, Manila, 1000 Metro Manila
            </h1>
            <h1>
              <span className="font-bold">Phone: </span>
              0909090990
            </h1>
            <h1>
              <span className="font-bold">Email: </span>
              timhortons@email.com
            </h1>
          </div>
          <form className="mt-6" onSubmit={submitHandler}>
            <p className="mb-2 text-sm font-medium">Name : </p>
            <input
              type="text"
              placeholder="Name"
              className="input__outline mb-3"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <p className="mb-2 text-sm font-medium">Email : </p>
            <input
              type="email"
              placeholder="Email"
              className="input__outline mb-3"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p className="mb-2 text-base  font-medium">Message : </p>
            <textarea
              rows="5"
              style={{ height: "auto" }}
              placeholder="Message"
              className="h-[48px] w-full  border border-gray-200 p-3 outline-none "
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              wrap="soft"
            />

            <button
              type="submit"
              className="button__solid mt-8"
              disabled={loadingCreateContact}
            >
              {loadingCreateContact ? (
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
                <span>SUBMIT</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
