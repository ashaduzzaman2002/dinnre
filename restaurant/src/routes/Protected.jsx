import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import LoadingScreens from "../components/laoding/LoadingScreens";

const Protected = ({ children }) => {
  const { profile, loading, profileCreacted } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!profile) {
      return navigate("/signin");
    } else {
      if (!profileCreacted) {
        return navigate("/create-profile");
      }
    }
  }, [profile, loading, profileCreacted, navigate]);

  if (loading) {
    return <LoadingScreens />;
  }

  return <>{children}</>;

  // if (loading) {
  //   return <LoadingScreens />;
  // } else {
  //   if (!profile) {
  //     navigate("/signin");
  //     return null;
  //   } else {
  //     if (!profileCreacted) {
  //       navigate("/create-profile");
  //       return null;
  //     } else {
  //       return <>{children}</>;
  //     }
  //   }
  // }
};

export default Protected;
