import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { formatPrice } from "../../utils/cartUtils";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { FaRegEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";
import { toast } from "react-toastify";
import CustomPagination from "../../components/CustomPagination";
import { CiSearch } from "react-icons/ci";

const ProductList = () => {
  const { pageNumber } = useParams();
  const [keyword, setKeyword] = useState("");

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const [deleteProduct, ] =
    useDeleteProductMutation();

  const deleteProductHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product")) {
      try {
        const res = await deleteProduct(id);
        toast.success(res.data.message);
        refetch();
      } catch (error) {
        toast.error(error?.data?.error || error.error || error?.data?.message);
      }
    }
  };

  return (
    <div className="flex flex-col   px-4 py-10 md:flex-row  md:flex-wrap  md:p-8 lg:flex-col lg:px-20 lg:py-10">
      {data?.products && (
        <div className="mb-24 flex w-full flex-col gap-6  md:mb-10">
          <div>
            <h1 className=" text-4xl font-bold">Products ({data?.count})</h1>
          </div>
          <div className=" flex h-[40px] flex-col gap-4 md:flex-row">
            <Link
              to="/admin/product/create"
              className=" flex  h-full  items-center gap-1 border bg-white p-2 text-sm shadow-md transition duration-300 hover:shadow-lg"
            >
              <MdOutlineAdd />
              CREATE PRODUCT
            </Link>
            <form
              className=" flex h-full items-center  border bg-white shadow-md hover:shadow-lg "
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex-shrink-0 p-2 pr-0">
                <CiSearch size={20} />
              </div>
              <input
                type="text"
                placeholder="Search product name"
                value={keyword}
                onChange={handleSearch}
                className=" flex-grow  px-2 focus:outline-none"
              />
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" message={error} />
      ) : (
        <>
          {data?.products.length === 0 && (
            <Message
              variant="info"
              message="No products found for the given search."
            />
          )}

          {data?.products.length > 0 && (
            <div className="overflow-auto">
              <table className=" shadow-m bg- min-w-full border  ">
                <thead>
                  <tr className="whitespace-nowrap">
                    <th className="px-4 py-2  text-left font-bold">NAME</th>
                    <th className=" w-[20%]  px-4 py-2 text-left font-bold">
                      DESCRIPTION
                    </th>
                    <th className="px-4 py-2  text-left font-bold">
                      PRICE - SMALL
                    </th>
                    <th className="px-4 py-2  text-left font-bold">
                      PRICE - MEDIUM
                    </th>
                    <th className="px-4 py-2  text-left font-bold">
                      PRICE - LARGE
                    </th>
                    <th className="px-4 py-2  text-left font-bold">CATEGORY</th>
                    <th className="px-4 py-2  text-left font-bold">
                      COUNT IN STOCK
                    </th>

                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products.map((product, index) => (
                    <tr
                      key={product._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }  whitespace-nowrap hover:bg-gray-200`}
                    >
                      <td className=" px-4 py-2">{product.name}</td>
                      <td className=" description  px-4 py-2">
                        {product.description}
                      </td>
                      <td className="px-4 py-2">
                        {formatPrice(product.prices.small)}
                      </td>
                      <td className="px-4 py-2">
                        {formatPrice(product.prices.medium)}
                      </td>
                      <td className="px-4 py-2">
                        {formatPrice(product.prices.large)}
                      </td>
                      <td className="title px-4 py-2">{product.category}</td>
                      <td className="title px-4 py-2 text-center">
                        {product.countInStock}
                      </td>
                      <td className="flex h-full items-center gap-2 px-4 py-2">
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <button className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100">
                            <FaRegEdit color="green" />
                          </button>
                        </Link>
                        <button
                          className="btn-sm rounded border border-gray-400 p-2 hover:bg-gray-100"
                          onClick={() => deleteProductHandler(product._id)}
                        >
                          <FaTrash color="red" />
                        </button>

                        <Link
                          to={`/products/${product._id}/category/${product.category}`}
                        >
                          <button className="btn-sm rounded border border-gray-400 px-2 py-1 hover:bg-gray-100 ">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data?.products.length > 0 && (
            <CustomPagination
              pages={data.pages}
              page={data.page}
              isAdmin={true}
              product={true}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
