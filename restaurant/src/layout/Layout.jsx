import React, { useContext } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { AppContext } from "../context/AppContext";
import LoadingScreens from "../components/laoding/LoadingScreens";

const Layout = ({ children, title }) => {
  const { loading, profile } = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // useEffect(() => {
  //   if (loading) {
  //     console.log("first");
  //     return;
  //   } else {
  //     console.log("second");
  //     if (!profile) return navigate("/signin");
  //   }
  // }, [profile, loading]);

  if (loading) {
    return <LoadingScreens />;
  } else {
    return (
      <div>
        <Helmet>
          <title>{title} - Circle</title>
        </Helmet>
        <Navbar />
        {children}
        <Footer />
      </div>
    );
  }
};

export default Layout;
