import { Link, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../slices/productsApiSlice";
import Loader from "./Loader";
import { cld } from "../utils/cloudinary.js";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";

const MenuCategories = () => {
  const { data: productCategories, isLoading, error } = useGetCategoriesQuery();

  const navigate = useNavigate();


  return (
    <>
      {isLoading ? (
        <Loader className="w-full lg:w-1/2" />
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <div className="cursor-pointer lg:basis-1/2 lg:flex-col">
          {productCategories.map((product, index) => {
            const myImage = cld.image(product.imageId);
            return (
              <div
                className={`flex items-center  justify-center border-l  border-[#d2d2d7]  ${
                  index % 2 === 0 ? " " : "flex-row-reverse  "
                }`}
                key={product._id}
              >
                <Link
                  to={`/products/category/${product.category}`}
                  className={`flex  w-1/2 flex-col items-center  justify-center px-2`}
                >
                  <h1 className="text-center text-[20px] font-bold md:text-[30px]">
                    {product.category}
                  </h1>
                  {index % 2 === 0 ? (
                    <h1 className="flex w-full items-center justify-center gap-1 font-bold  hover:underline">
                      Shop now
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.3761 17L14.4888 16.1348L18.6084 12.118H4.96094V10.882H18.6084L14.4888 6.86517L15.3761 6L21.0379 11.5L15.3761 17Z"
                          fill="#121212"
                        />
                      </svg>
                    </h1>
                  ) : (
                    <h1 className="flex w-full items-center  justify-center gap-1 font-bold hover:underline">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 11V13L7 13L10.6413 16.5L9.113 18L3 12L9.113 6L10.6413 7.5L7 11L21 11Z"
                          fill="black"
                        />
                      </svg>
                      Shop now{" "}
                    </h1>
                  )}
                </Link>

                <AdvancedImage
                  cldImg={myImage}
                  plugins={[placeholder({ mode: "blur" }), responsive()]}
                  className="h-[150px] w-1/2 object-cover md:h-[250px]  lg:h-[200px]  lg:border-0  "
                  onClick={() => {
                    navigate(`/products/category/${product.category}`);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MenuCategories;
