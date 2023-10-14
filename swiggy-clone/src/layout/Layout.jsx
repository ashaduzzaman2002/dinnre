import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Layout = ({ children, title }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    {
      title: "Home",
      path: "/",
    },

    {
      title: "Item",
      path: "/item",
    },

    {
      title: "Restaurants",
      path: "/restaurants",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>{title} - Circle</title>
      </Helmet>
      <Navbar type={"user"} navLinks={navLinks} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
