import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Layout = ({ children, title }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{title} - Circle</title>
      </Helmet>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
