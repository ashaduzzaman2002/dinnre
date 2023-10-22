import { createContext, useEffect, useState } from "react";
import { dbObject } from "../helper/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  // get profile data
  const getProfile = async () => {
    setLoading(true);
    try {
      const { data } = await dbObject.get("/profile");
      console.log(data);
      if (data?.success) {
        setProfile(data?.user);
      }

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AppContext.Provider value={{ profile, setProfile, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};
