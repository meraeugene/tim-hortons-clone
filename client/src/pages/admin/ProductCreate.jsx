import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { IoCaretBackOutline } from "react-icons/io5";

const ProductCreate = () => {
  const [name, setName] = useState("");
  const [priceSmall, setPriceSmall] = useState(0);
  const [priceMedium, setPriceMedium] = useState(0);
  const [priceLarge, setPriceLarge] = useState(0);
  const [image, setImage] = useState("");
  const [imgFilename, setImgFilename] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const [createProduct, { isLoading: loadingCreateProduct }] =
    useCreateProductMutation();

  const [uploadProductImage] = useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await createProduct({
        name,
        image,
        priceSmall,
        priceMedium,
        priceLarge,
        description,
        category,
        countInStock,
      });

      if (result.error) {
        toast.error(result.error.data.message);
      } else {
        toast.success(result.data.message);
        navigate("/admin/productlist");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const uploadFileHandler = async (e) => {
    const selectedFile = e.target.files[0];

    setImgFilename(selectedFile.name);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="p-6 pb-10 pt-14 md:p-20">
      <Link
        to="/admin/productlist"
        className="flex  w-[100px]  items-center gap-1 border border-[#d2d2d7] bg-white p-2 text-sm transition duration-300 ease-in-out hover:bg-[#121212] hover:text-white"
      >
        <IoCaretBackOutline />
        Go Back
      </Link>
      <div className="flex flex-col justify-center md:items-center  ">
        <h1 className="mb-4 mt-8 text-2xl font-extrabold uppercase md:mb-10 md:text-4xl">
          Create Product
        </h1>

        <form className=" w-full md:w-1/2" onSubmit={submitHandler}>
          <p className="mb-2 text-base font-medium">Name : </p>
          <input
            type="text"
            placeholder="Product Name"
            className="input__outline mb-5"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <p className="mb-2 text-base  font-medium">Price for small : </p>
          <input
            type="text"
            className="input__outline mb-5"
            onChange={(e) => setPriceSmall(e.target.value)}
            value={priceSmall}
          />
          <p className="mb-2 text-base  font-medium">Price for medium : </p>
          <input
            type="text"
            className="input__outline mb-5"
            onChange={(e) => setPriceMedium(e.target.value)}
            value={priceMedium}
          />
          <p className="mb-2 text-base  font-medium">Price for large : </p>
          <input
            type="text"
            className="input__outline mb-5"
            onChange={(e) => setPriceLarge(e.target.value)}
            value={priceLarge}
          />
          <p className="mb-2 text-base  font-medium">Category : </p>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="mb-5 h-[48px] w-full cursor-pointer border border-[#d2d2d7] outline-none"
          >
            <option value="" hidden>
              Select category...
            </option>
            <option value="Hot Coffee">Hot Coffee</option>
            <option value="Ice Coffee">Ice Coffee</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch and Sandwiches">Lunch and Sandwiches</option>
            <option value="Wedges and Dips">Wedges and Dips</option>
            <option value="Donuts and Timbits">Donuts and Timbits</option>
            <option value="Baked Goods">Baked Goods</option>
            <option value="Retail Packs">Retail Packs</option>
          </select>
          <p className="mb-2 text-base  font-medium">Count In Stock : </p>
          <input
            type="text"
            className="input__outline mb-5"
            onChange={(e) => setCountInStock(e.target.value)}
            value={countInStock}
          />

          <p className="mb-2 text-base  font-medium">Description : </p>
          <textarea
            rows="5"
            style={{ height: "auto" }}
            placeholder="Product Description"
            className="input__outline mb-5"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            wrap="soft"
          />

          <p className="mb-2 text-base  font-medium">Image : </p>

          <label className="img-label cursor-pointer" htmlFor="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            Choose a Image
          </label>

          {imgFilename && (
            <p className=" mt-2  text-base font-medium">
              File name: {imgFilename}
            </p>
          )}

          <input
            type="file"
            name="image"
            id="file"
            onChange={uploadFileHandler}
            className=" w-full rounded "
          />

          <button
            type="submit"
            className="button__solid mt-8"
            disabled={loadingCreateProduct}
          >
            {loadingCreateProduct ? (
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
              <span>CREATE A PRODUCT</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;
