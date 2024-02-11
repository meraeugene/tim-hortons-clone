import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();

  // Define an array of routes where you want to hide the footer
  const routesWithoutFooter = ["/auth/login", "/auth/register"];

  // Check if the current route is in the array of routes without the footer
  const hideFooter = routesWithoutFooter.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={true}
        theme="light"
      />
    </>
  );
};

export default App;
