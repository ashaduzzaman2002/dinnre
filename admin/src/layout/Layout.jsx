import React, { useContext, useEffect } from "react";
// import { AppContext } from "../context/AppContext";
import {  useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const AdminRoute = ({ children }) => {
//   const { user, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    {
      title: "Dashboard",
      path: "/",
    },

    {
      title: "Restaurant",
      path: "/restaurant/all",
    },

    {
      title: "Resister Restaurant",
      path: "/restaurant/resister",
    },
  ];

//   if (loading) {
//     return (
//       <div
//         id="spinner"
//         className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
//       >
//         <div
//           className="spinner-border text-primary"
//           style={{ width: "3rem", height: "3rem" }}
//           role="status"
//         >
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     );
//   }

  // if (!user) {
  //   navigate("/signin", { state: { from: location.pathname } });
  //   return null;
  // } else if (user && user.role !== "admin") {
  //   navigate("/");
  //   return null;
  // }

  return (
    <>
      <Navbar type="restaurant" navLinks={navLinks} />

      {children}

      <footer
        style={{ backgroundColor: "white", color: "gray" }}
        className="text-center mt-5"
      >
        @ Circle allright reserve
      </footer>
    </>
  );
};

export default AdminRoute;
