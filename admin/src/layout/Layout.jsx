import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Helmet } from "react-helmet";

const AdminRoute = ({ children, title }) => {

  const navLinks = [
    {
      title: "Dashboard",
      path: "/admin",
    },

    {
      title: "Restaurants",
      path: "/admin/restaurants",
    },

    {
      title: "Orders",
      path: "/admin/orders",
    },

    {
      title: "Verify",
      path: "/admin/verify",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{title ? `${title} || ` : ""}Admin - Dinnre</title>
      </Helmet>
      <Navbar type="restaurant" navLinks={navLinks} />
      {children}
    </>
  );
};

export default AdminRoute;
