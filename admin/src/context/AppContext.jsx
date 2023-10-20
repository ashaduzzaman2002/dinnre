import { createContext, useEffect, useState } from "react";
import { dbObject } from "../helper/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [verifiedRestaurants, setVerifiedRestaurants] = useState([]);
  const [vrLoading, setVRLoading] = useState(false);

  // get profile data
  const getProfile = async () => {
    setLoading(true);
    try {
      const { data } = await dbObject.get("/user");
      console.log(data);
      if (data?.success) {
        setProfile(data?.user);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  // get verified restaurants
  const getVerifiedRestaurants = async () => {
    try {
      const { data } = await dbObject.get("/all/verified-restaurants");
      console.log(data);

      if (data.success) {
        setVerifiedRestaurants(data?.restaurants);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getVerifiedRestaurants();
  }, []);

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        loading,
        setLoading,
        verifiedRestaurants,
        setVerifiedRestaurants,
        vrLoading,
        setVRLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
