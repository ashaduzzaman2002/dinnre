import { createContext, useEffect, useState } from "react";
import { dbObject } from "../helper/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AppContext.Provider value={{ profile, setProfile, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};