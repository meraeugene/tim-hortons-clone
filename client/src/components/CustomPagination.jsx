import { Link } from "react-router-dom";

const CustomPagination = ({
  pages,
  page,
  isAdmin = false,
  isLogin = false,
  category,
  order = false,
  product = false,
  user = false,
  review = false,
  myorders = false,
  contact = false,
}) => {
  if (pages <= 1) {
    return null;
  }

  const getPageLink = (pageNumber) => {
    if (isAdmin && product) {
      return `/admin/productlist/page/${pageNumber}`;
    } else if (isAdmin && order) {
      return `/admin/orderlist/page/${pageNumber}`;
    } else if (isAdmin && user) {
      return `/admin/userlist/page/${pageNumber}`;
    } else if (isAdmin && review) {
      return `/admin/reviewlist/page/${pageNumber}`;
    } else if (isAdmin && contact) {
      return `/admin/contactlist/page/${pageNumber}`;
    } else if (isLogin && myorders) {
      return `/profile/page/${pageNumber}`;
    } else if (category) {
      return `/products/category/${category}/page/${pageNumber}`;
    }
  };

  return (
    <div className="mt-8 flex flex-wrap items-center justify-start gap-[8px]">
      {page > 1 && (
        <>
          <Link
            to={getPageLink(1)}
            className="rounded-md border  bg-white  px-4 py-2 text-black shadow-md transition-all  duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            First
          </Link>
          <Link
            to={getPageLink(page - 1)}
            className="rounded-md  border bg-white px-4 py-2 text-black shadow-md transition-all  duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Previous
          </Link>
        </>
      )}

      {[...Array(pages).keys()].map((pageNumber) => (
        <Link
          key={pageNumber + 1}
          to={getPageLink(pageNumber + 1)}
          className={`rounded-md border px-4 py-2 ${
            pageNumber + 1 === page
              ? "bg-black text-white shadow-md"
              : " border bg-white shadow-md  transition-all duration-300 ease-in-out hover:bg-black  hover:text-white"
          }`}
        >
          {pageNumber + 1}
        </Link>
      ))}

      {page < pages && (
        <>
          <Link
            to={getPageLink(page + 1)}
            className="rounded-md border bg-white px-4 py-2 text-black shadow-md  transition-all  duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Next
          </Link>
          <Link
            to={getPageLink(pages)}
            className="rounded-md border bg-white px-4 py-2 text-black shadow-md  transition-all  duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            Last
          </Link>
        </>
      )}
    </div>
  );
};

export default CustomPagination;
