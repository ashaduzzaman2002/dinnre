import React, { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { AppContext } from "../context/AppContext";
import NotVerified from "../components/not-verified/NotVerified";

const Layout = ({ children, title }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const { isVerified } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>{title} - Circle</title>
      </Helmet>
      <Navbar />
      {isVerified || title === "Profile" ? children : <NotVerified />}
      <Footer />
    </>
  );
};

export default Layout;
