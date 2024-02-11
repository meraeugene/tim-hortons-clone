const Message = ({ variant, message }) => {
  return (
    (variant === "success" && (
      <div className="rounded-[4px] border border-green-300 bg-green-100 px-3 py-4 font-semibold text-green-700">
        {message}
      </div>
    )) ||
    (variant === "error" && (
      <div className="rounded-[4px] border border-red-300 bg-red-100 px-3 py-4 font-semibold text-red-700">
        {message}
      </div>
    )) ||
    (variant === "info" && (
      <div className="rounded-[4px] border  bg-white px-3 py-4 text-sm font-normal text-gray-400 shadow-md lg:text-lg ">
        {message}
      </div>
    ))
  );
};

export default Message;
