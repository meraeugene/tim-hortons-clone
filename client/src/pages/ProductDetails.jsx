import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Rating from "../components/Rating.jsx";

import {
  useGetProductDetailsQuery,
  useGetProductsByCategoryQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import { addToCart } from "../slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../utils/cartUtils.js";
import { toast } from "react-toastify";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import Meta from "../components/Meta.jsx";
import { cld } from "../utils/cloudinary.js";
import Message from "../components/Message.jsx";

const ProductDetails = () => {
  const { id: productId, category, pageNumber } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state?.auth?.userInfo);

  const {
    data: singleProduct,
    isLoading: singleProductLoading,
    error: singleProductError,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const {
    data,
    error: errorProductsByCategories,
    isLoading: loadingProductsByCategory,
  } = useGetProductsByCategoryQuery({
    category,
    pageNumber: pageNumber || 1,
  });

  const increaseQuantityHandler = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantityHandler = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));
  };

  const sizeSelectionHandler = (e) => {
    setSize(e.target.value);
  };

  const addToCartHandler = async (name) => {
    if (!size) {
      toast.error("☕ Please select a size ");
    } else {
      let selectedPrice = 0;

      // Determine the selected price based on the size
      switch (size) {
        case "small":
          selectedPrice = singleProduct.prices.small;
          break;
        case "medium":
          selectedPrice = singleProduct.prices.medium;
          break;
        case "large":
          selectedPrice = singleProduct.prices.large;
          break;
        default:
          selectedPrice = singleProduct.prices.small; // Default to small if size is not recognized
      }

      dispatch(
        addToCart({
          ...singleProduct,
          price: selectedPrice, // Use the selected price
          quantity,
          size,
        }),
      );

      toast.success(`${quantity} ${size.toUpperCase()} ${name}  added to cart`);
      setQuantity(1);
    }
  };

  const submitProductReviewHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success(res.message);
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.error || error.error || error?.data?.message);
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const currentProductId = singleProduct?._id;

  const myImage = cld.image(singleProduct?.image);

  return (
    <div>
      {singleProductLoading ? (
        <Loader />
      ) : singleProductError ? (
        <div className="m-4 md:m-10 ">
          <Message
            variant="error"
            message={
              singleProductError?.data?.message || singleProductError.error
            }
          />
        </div>
      ) : (
        <>
          <Meta title={`${category} | ${singleProduct.name}`} />
          <div className="flex flex-col   md:flex-row">
            <div className="left__column flex items-center justify-center border-b border-[#d2d2d7] md:basis-1/2 md:border-b md:border-r">
              <AdvancedImage
                cldImg={myImage}
                plugins={[placeholder({ mode: "blur" }), responsive()]}
                className="w-full  bg-white object-cover  md:w-[75%]  lg:w-[60%]"
              />
            </div>
            <div className="right__column px-4 py-10 md:basis-1/2 md:border-b md:border-[#d2d2d7]  md:p-10  ">
              <h6 className="mb-6 text-xs font-medium uppercase">
                <span className="font-bold">{singleProduct.category}</span>
                /QUICK ORDER
              </h6>
              <div className="mb-4 flex flex-col gap-2  ">
                <h1 className="text-[22px] font-semibold lg:text-4xl">
                  {singleProduct.name}
                </h1>
                <h1 className="text-[22px] font-semibold lg:text-4xl">
                  {formatPrice(singleProduct.prices.small)}
                </h1>
              </div>

              {singleProduct.countInStock > 0 ? (
                <h1 className="mb-4 mt-2 text-base font-semibold md:mb-2">
                  In Stock
                </h1>
              ) : (
                <h1 className="mb-4 mt-2 text-base font-semibold md:mb-2">
                  Out of Stock
                </h1>
              )}

              <Rating
                value={singleProduct.rating}
                text={`${singleProduct.numReviews} Reviews`}
              />

              <p className="mb-6 mt-4 text-sm font-normal lg:text-base">
                {singleProduct.description}
              </p>

              <div className="gap-4 md:flex md:items-center">
                <h1 className="mb-4 text-lg font-semibold md:mb-0">Quantity</h1>
                {singleProduct.countInStock > 0 && (
                  <div className="flex w-full items-center lg:w-[20%]">
                    <button
                      className="minus__btn flex h-[44px] w-[44px] items-center justify-center border shadow-md hover:shadow-lg"
                      onClick={decreaseQuantityHandler}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="2"
                        viewBox="0 0 20 2"
                        fill="none"
                      >
                        <path d="M19.5 1.5H0.5V0.5H19.5V1.5Z" fill="#121212" />
                      </svg>
                    </button>
                    <div className="quantity flex h-[44px]  w-[44px]  items-center  justify-center border-y  shadow-md ">
                      {quantity}
                    </div>
                    <button
                      className="add__btn flex h-[44px] w-[44px]  items-center justify-center border shadow-md hover:shadow-lg"
                      onClick={increaseQuantityHandler}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M19.5 10.5H0.5V9.5H19.5V10.5Z"
                          fill="#121212"
                        />
                        <path d="M10.5 0.5V19.5H9.5V0.5H10.5Z" fill="#121212" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div className="size__container mt-4 gap-4 md:flex md:items-center">
                <h1 className="mb-4 mt-6 text-lg font-semibold">Size</h1>

                <select
                  name="sizes"
                  id="sizes"
                  className=" h-[44px] w-full border bg-white shadow-md outline-none md:w-full lg:w-[35%]"
                  onChange={sizeSelectionHandler}
                  value={size}
                >
                  <option value="" disabled>
                    Select size...
                  </option>
                  <option value="small">
                    Small (10 ounces) {formatPrice(singleProduct.prices.small)}
                  </option>
                  <option value="medium">
                    Medium (14 ounces){" "}
                    {formatPrice(singleProduct.prices.medium)}
                  </option>
                  <option value="large">
                    Large (20 ounces) {formatPrice(singleProduct.prices.large)}
                  </option>
                </select>
              </div>

              <div className="price__container ">
                <div className="flex flex-col gap-1">
                  <button
                    type="submit"
                    className="button__solid mt-6"
                    disabled={singleProduct.countInStock === 0}
                    onClick={() => addToCartHandler(singleProduct.name)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="reviews__container flex w-full flex-col  gap-4 border-t border-[#d2d2d7] px-4 pb-20 pt-10  md:border-t-0 md:px-12 lg:w-1/2 lg:pl-20 lg:pt-16">
            <div className="   mb-2 border  border-gray-200 bg-white px-3 py-3 text-[22px]  font-semibold text-gray-700">
              Reviews
            </div>
            {singleProduct.reviews.length === 0 && (
              <div className="  border border-red-200 bg-red-100 px-3 py-3 text-[22px] font-semibold text-red-700 ">
                No Reviews
              </div>
            )}
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
              {singleProduct.reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-200 bg-white px-3 py-4"
                >
                <div className="flex items-center gap-2 mb-4">
             
                  <img src={review.image} alt="profile pic" className="w-[40px] rounded-full" />
                  <h1 className=" text-base font-semibold ">
                    {capitalizeFirstLetter(review.firstName)}{" "}
                    {capitalizeFirstLetter(review.lastName)}
                  </h1>
                </div>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p className="mt-3">{review.comment}</p>
                </div>
              ))}
            </div>
            <div className="write-review__container mt-8 ">
              <h1 className="    rounded-[4px] border border-gray-200  bg-white px-3 py-4 text-xl font-medium text-gray-700">
                Your Feedback Matters{" "}
              </h1>
              {userInfo ? (
                <form className="mt-4" onSubmit={submitProductReviewHandler}>
                  <p className="mb-2 text-base  font-medium">Rating : </p>

                  <select
                    onChange={(e) => setRating(e.target.value)}
                    className="mb-4 h-[48px] w-full cursor-pointer border border-gray-200 bg-white px-2 outline-none"
                    value={rating}
                  >
                    <option value="" hidden>
                      Select rating...
                    </option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  <p className="mb-2 text-base  font-medium">Comment : </p>
                  <textarea
                    rows="5"
                    style={{ height: "auto" }}
                    placeholder="Product Review"
                    className="h-[48px] w-full  border border-gray-200 p-3 outline-none "
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    wrap="soft"
                  />

                  <button
                    type="submit"
                    className="button__solid mt-6"
                    disabled={loadingProductReview}
                  >
                    {loadingProductReview ? (
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
              ) : (
                <div className="mt-4 rounded-[4px] border border-red-200 bg-red-100 px-3 py-3 text-[16px] font-semibold text-red-700 ">
                  Please{" "}
                  <Link to="/auth/login" className="underline">
                    login
                  </Link>{" "}
                  to write a review.
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {loadingProductsByCategory ? (
        <Loader />
      ) : errorProductsByCategories ? (
        <h1>
          {errorProductsByCategories?.data?.message ||
            errorProductsByCategories.error}
        </h1>
      ) : (
        data?.products?.length !== 0 && (
          <div className="recommendation__container  border-t-0 border-[#d2d2d7]  md:border-t-0">
            <h1 className="border-y border-[#d2d2d7] px-6 py-10 text-center text-[26px] font-semibold">
              You may also like...
            </h1>
            {
              <Swiper
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                loop={true}
                className="mySwiper  my-20"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 15,
                  },
                  768: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                  },
                }}
              >
                {data?.products?.length !== 0 &&
                  data?.products
                    ?.filter((product) => product._id !== currentProductId)
                    .map((product) => {
                      const image = cld.image(product.imageId);
                      return (
                        <SwiperSlide key={product._id}>
                          <Link
                            to={`/products/${product._id}/category/${product.category}`}
                          >
                            <div className="relative ">
                              <AdvancedImage
                                cldImg={image}
                                plugins={[
                                  placeholder({ mode: "blur" }),
                                  responsive(),
                                ]}
                                className="border border-b-0 border-t-0 border-[#121212] object-cover"
                              />
                              <div className="absolute bottom-0 left-0 flex h-full w-full flex-col items-center justify-center pb-4">
                                <div className="overlay absolute left-0 top-0 h-full w-full bg-black bg-opacity-45 "></div>
                                <div className="flex flex-col flex-wrap gap-2">
                                  <h1 className="title z-10 text-xl text-white md:text-lg lg:text-xl">
                                    {product.name}
                                  </h1>
                                  <h1 className="z-10 text-3xl font-bold text-white">
                                    {formatPrice(product.prices.small)}
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </SwiperSlide>
                      );
                    })}
              </Swiper>
            }
          </div>
        )
      )}
    </div>
  );
};

export default ProductDetails;
