import { useParams } from "react-router-dom";
import Rating from "../components/Rating.jsx";
import { Link } from "react-router-dom";
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../slices/productsApiSlice.js";
import Loader from "../components/Loader.jsx";
import { formatPrice } from "../utils/cartUtils.js";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import { cld } from "../utils/cloudinary.js";
import CustomPagination from "../components/CustomPagination.jsx";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Message from "../components/Message.jsx";

const Category = () => {
  const { category, pageNumber } = useParams();
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState(""); // Default sorting order is ascending

  const {
    data: productCategories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const { data, error, isLoading } = useGetProductsByCategoryQuery({
    keyword,
    category,
    pageNumber: pageNumber || 1,
  });

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const handleSortChange = (order) => {
    setSortBy(order);
  };

  const sortProducts = (products) => {
    return products.slice().sort((a, b) => {
      const priceA = a.price;
      const priceB = b.price;

      if (sortBy === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  };

  return (
    <div className="flex flex-col  ">
      {categoriesLoading ? (
        <Loader />
      ) : categoriesError ? (
        <div>{categoriesError?.data?.message || categoriesError.error}</div>
      ) : (
        <div className="overlay__container-title ">
          <div className="relative">
            {productCategories
              .filter((product) => product.category === category)
              .map((product) => {
                const myImage = cld.image(product.imageId);
                return (
                  <AdvancedImage
                    key={product._id}
                    cldImg={myImage}
                    plugins={[placeholder({ mode: "blur" }), lazyload()]}
                    className="w-full    object-cover lg:h-[300px]  "
                  />
                );
              })}

            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
              <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-55"></div>
              <div className="relative z-10 flex flex-col items-center justify-center gap-5 px-[16px] py-[40px] md:p-20">
                <h1 className=" text-center text-[40px] font-semibold leading-[120%] text-[#fff] lg:text-7xl">
                  {category}
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <div className="p-4 md:p-10 lg:p-20 ">
          {data?.products && (
            <div className=" mt-4 flex  w-full  flex-col  gap-4 md:w-[70%] md:flex-row md:gap-4 lg:w-[35%]">
              <form
                className="flex    basis-[60%]  items-center border bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-lg "
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="p-2 pr-0">
                  <CiSearch size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={keyword}
                  onChange={handleSearch}
                  className="h-[45px]  w-full  px-2 focus:outline-none"
                />
              </form>

              <div className=" basis-[40%]">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="h-[45px] w-full border bg-white p-2 shadow-md outline-none transition-all duration-300 ease-in-out hover:shadow-lg"
                >
                  <option value="" disabled>
                    Sort By Price
                  </option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div>
            </div>
          )}

          {data?.products.length === 0 && (
            <div className="my-6 w-full md:mt-10 lg:w-[30%]">
              <Message
                variant="info"
                message="No product found for the given search."
              />
            </div>
          )}
          {data?.products.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-8    md:grid-cols-4   md:gap-8  lg:grid-cols-5 lg:gap-8">
              {sortProducts(data.products).map((product) => {
                return (
                  <Link
                    key={product._id}
                    to={`/products/${product._id}/category/${product.category}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="border border-[#d2d2d7] bg-white transition duration-300 ease-in-out hover:shadow-md"
                      loading="lazy"
                    />

                    <div className="mt-2 flex flex-col">
                      <p className="title mb-2 font-semibold">{product.name}</p>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                      <h2 className="text-xl font-semibold text-gray-600">{`${formatPrice(
                        product.prices.small,
                      )}`}</h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {data?.products.length > 0 && (
            <div className="pb-10">
              <CustomPagination
                pages={data.pages}
                page={data.page}
                category={category}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
