import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";
import CheckoutShipping from "./pages/users/CheckoutShipping.jsx";
import CheckoutInformation from "./pages/users/CheckoutInformation.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import CheckoutPayment from "./pages/users/CheckoutPayment.jsx";
import CheckoutPlaceOrder from "./pages/users/CheckoutPlaceOrder.jsx";
import Order from "./pages/users/Order.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Profile from "./pages/users/Profile.jsx";
import OrderList from "./pages/admin/OrderList.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import ProductEdit from "./pages/admin/ProductEdit.jsx";
import UserList from "./pages/admin/UserList.jsx";
import UserEdit from "./pages/admin/UserEdit.jsx";
import ReviewList from "./pages/admin/ReviewList.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ContactList from "./pages/admin/ContactList.jsx";
import ProductCreate from "./pages/admin/ProductCreate.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import OrderEdit from "./pages/admin/OrderEdit.jsx";
import {store,persistor} from "./store.js";
import { PersistGate } from 'redux-persist/integration/react';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/products/category/:category" element={<Category />} />
      <Route
        path="/products/category/:category/page/:pageNumber"
        element={<Category />}
      />
      <Route
        path="/products/:id/category/:category"
        element={<ProductDetails />}
      />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Signup />} />
      <Route path="/auth/verifyOTP" element={<VerifyOTP />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/*" element={<ErrorPage />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/checkout/information" element={<CheckoutInformation />} />
        <Route path="/checkout/shipping" element={<CheckoutShipping />} />
        <Route path="/checkout/payment" element={<CheckoutPayment />} />
        <Route path="/checkout/placeorder" element={<CheckoutPlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/page/:pageNumber" element={<Profile />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderList />} />
        <Route
          path="/admin/orderlist/page/:pageNumber"
          element={<OrderList />}
        />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route
          path="/admin/productlist/page/:pageNumber"
          element={<ProductList />}
        />
        <Route path="/admin/userlist" element={<UserList />} />
        <Route path="/admin/userlist/page/:pageNumber" element={<UserList />} />
        <Route path="/admin/reviewlist" element={<ReviewList />} />
        <Route
          path="/admin/reviewlist/page/:pageNumber"
          element={<ReviewList />}
        />

        <Route path="/admin/contactlist" element={<ContactList />} />
        <Route
          path="/admin/contactlist/page/:pageNumber"
          element={<ContactList />}
        />

        <Route path="/admin/order/:id/edit" element={<OrderEdit />} />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/user/:id/edit" element={<UserEdit />} />
        <Route path="/admin/product/create" element={<ProductCreate />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
      <PersistGate persistor={persistor} >
      <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </PersistGate>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
);
