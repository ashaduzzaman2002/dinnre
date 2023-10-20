import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import LoadingScreens from "../components/laoding/LoadingScreens";

const Protected = ({ children }) => {
  const { profile, loading } = useContext(AppContext);
  const navigate = useNavigate();

  if (loading) {
    return <LoadingScreens />;
  } else {
    if (!profile) {
      navigate("/admin/signin");
      return null;
    } else {
      return <>{children}</>;
    }
  }
};

export default Protected;
