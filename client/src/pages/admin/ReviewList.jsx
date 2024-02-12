import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteReviewMutation,
  useGetReviewsQuery,
} from "../../slices/productsApiSlice";
import Rating from "../../components/Rating";
import { formatPrice } from "../../utils/cartUtils.js";
import { CiSearch } from "react-icons/ci";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import { cld } from "../../utils/cloudinary.js";
import CustomPagination from "../../components/CustomPagination";
import { FaTrash } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { toast } from "react-toastify";
import { MdOutlineReviews } from "react-icons/md";

const ReviewList = () => {
  const { pageNumber } = useParams();
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState(""); // Default sorting order is ascending

  const { data, isLoading, error, refetch } = useGetReviewsQuery({
    keyword,
    pageNumber,
  });

  const [deleteReview, { isLoading: loadingDeleteContact }] =
    useDeleteReviewMutation();

  const [optionsState, setOptionsState] = useState({});

  const toggleOptions = (reviewId) => {
    setOptionsState((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  const deleteContactHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product")) {
      try {
        const res = await deleteReview(id);
        toast.success(res.data.message);
        refetch();
      } catch (error) {
        toast.error(error?.data?.error || error.error || error?.data?.message);
      }
    }
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleSortChange = (order) => {
    setSortBy(order);
  };

  const sortProducts = (products) => {
    return products.slice().sort((a, b) => {
      const reviewsA = a.numReviews;
      const reviewsB = b.numReviews;

      if (sortBy === "asc") {
        return reviewsB - reviewsA;
      } else {
        return reviewsA - reviewsB;
      }
    });
  };

  return (
    <div className="flex flex-col px-4 py-10 md:flex-row md:flex-wrap md:p-8 lg:flex-col lg:py-20 lg:px-10 ">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message
          variant="error"
          message={error?.data?.error || error.error || error?.data?.message}
        />
      ) : (
        <>
          {data?.productsWithImageIds && (
            <div className="mb-10 flex w-full flex-col justify-between gap-4 lg:flex-row">
              <div>
                <h1 className=" text-4xl font-bold">Reviews ({data?.count})</h1>
              </div>
              <div className=" mt-4 flex w-full flex-col gap-4   md:w-1/2 lg:w-[45%]  lg:flex-row ">
                <form
                  className=" flex w-full items-center  border bg-white shadow-md hover:shadow-lg  "
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="p-2 pr-0">
                    <CiSearch size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by customer name..."
                    value={keyword}
                    onChange={handleSearch}
                    className="h-[40px]   w-full px-2 focus:outline-none"
                  />
                </form>
                <div className="w-full">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="h-[40px]  w-full border bg-white px-2 shadow-md outline-none transition-all duration-300 ease-in-out hover:shadow-lg"
                  >
                    <option value="" disabled>
                      Sort By Popularity
                    </option>
                    <option value="asc">Most Reviewed to Least Reviewed</option>
                    <option value="desc">
                      Least Reviewed to Most Reviewed
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {data?.productsWithImageIds.length === 0 && (
            <div className="w-full md:w-[50%] ">
              <Message
                variant="info"
                message="No user review found for the given search."
              />
            </div>
          )}

          {data?.productsWithImageIds.length > 0 && (
            <div className="grid-col-1 grid gap-8 md:grid-cols-2 lg:grid-cols-3  ">
              {sortProducts(data?.productsWithImageIds).map((product) => {
                const myImage = cld.image(product.imageId);
                return (
                  <div key={product._id}>
                    <div className="flex  h-full flex-col gap-4 border border-[#d2d2d7] bg-white p-4 transition duration-300 ease-in-out hover:shadow-lg">
                      <div className="transition duration-300  ease-in-out hover:shadow-lg lg:border lg:border-[#d2d2d7] lg:p-4">
                        <div className="flex w-full flex-col  gap-6 lg:flex-row">
                          <Link
                            to={`/products/${product._id}/category/${product.category}`}
                            className="img__container basis-1/2 "
                          >
                            <AdvancedImage
                              key={product._id}
                              cldImg={myImage}
                              plugins={[
                                placeholder({ mode: "blur" }),
                                lazyload(),
                              ]}
                              className="h-full border border-[#d2d2d7] object-cover transition duration-300 ease-in-out hover:shadow-lg"
                            />
                          </Link>
                          <div className="details__container basis-1/2 ">
                            <Link
                              to={`/products/${product._id}/category/${product.category}`}
                              className="md:review-product-title text-base font-bold"
                            >
                              {product.name}
                            </Link>
                            <h1 className="text-sm font-bold">
                              {product.category}
                            </h1>
                            <Rating
                              value={product.rating}
                              text={`${product.numReviews} Reviews`}
                            />
                            <h1 className="mt-4 text-3xl font-bold">
                              {formatPrice(product.prices.small)}
                            </h1>

                            <p className="review-description mt-3 max-h-[60px] overflow-hidden text-ellipsis text-sm">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rating__container grid grid-cols-1 gap-4 md:grid-cols-2 ">
                        {product.reviews.map((review) => (
                          <div
                            key={review._id}
                            className="border  border-[#d2d2d7] p-3 transition duration-300 ease-in-out hover:shadow-lg"
                          >
                            <div className="relative flex items-center justify-between mb-2">
                              <h2 className=" text-base font-semibold">
                                {capitalizeFirstLetter(review.firstName)}{" "}
                                {capitalizeFirstLetter(review.lastName)}
                              </h2>
                              <SlOptions
                                className=" cursor-pointer text-gray-900 transition-all duration-300 ease-in-out hover:text-gray-500"
                                onClick={() => toggleOptions(review._id)}
                              />
                              {optionsState[review._id] && (
                                <div className="contact-options__container  absolute bottom-[-85px] right-[0px] min-w-[130px] border  bg-white shadow-lg">
                                  <Link
                                    to={`/products/${product._id}/category/${product.category}`}
                                    className=" flex cursor-pointer  items-center gap-2 border-b  border-[#d2d2d7]  px-3 py-2 transition-all duration-300 ease-in-out  hover:bg-gray-500 hover:text-white"
                                  >
                                    <MdOutlineReviews />
                                    View
                                  </Link>
                                  <div
                                    className=" flex cursor-pointer   items-center gap-2 px-3 py-2 text-red-500 transition-all duration-300  ease-in-out hover:bg-red-200 hover:font-bold "
                                    onClick={() =>
                                      deleteContactHandler(review._id)
                                    }
                                  >
                                    <FaTrash />
                                    Delete
                                  </div>
                                </div>
                              )}
                            </div>
                            <Rating value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p className="mt-1">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {data?.productsWithImageIds.length > 0 && (
            <CustomPagination
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              review={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ReviewList;
