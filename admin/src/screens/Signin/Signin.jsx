import React, { useContext, useEffect, useState } from "react";
import "./signin.css";
import { dbObject } from "../../helper/api";
import { useLocation, useNavigate } from "react-router-dom";
import Toastify, { tostOptions } from "../../components/Toastify/Toastify";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import LoadingScreens from "../../components/laoding/LoadingScreens";
import LoadingSpinner from "../../components/laoding/LoadingSpinner";

const Signin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const { setProfile, loading, profile } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [miniLoading, setMiniLoading] = useState(false);

  console.log(loading);
  const handleLogin = async () => {
    setMiniLoading(true);
    try {
      const { data } = await dbObject.post("/login", input);
      console.log(data);

      if (data.success) {
        toast.success(data.msg, tostOptions);
        setTimeout(() => {
          if (isMounted) {
            setProfile(data?.user);
            navigate("/");
            setMiniLoading(false);
          }
        }, 1000);
      } else {
        toast.error(data.msg, tostOptions);
        setMiniLoading(false);
      }
    } catch (error) {
      console.log(error?.response?.data?.msg);
      console.log(error?.response?.data?.msg);
      if (isMounted) {
        toast.error(error?.response?.data?.msg, tostOptions);
      }

      setMiniLoading(false);
    }
  };
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  if (loading) {
    return <LoadingScreens />;
  } else {
    if (profile) {
      navigate(location.state?.from || "/admin");
      return null;
    } else {
      return (
        <div className="signup_container">
          <Toastify />
          <div className="signup_left_logo"></div>

          <div className="box signup_box">
            <h1>Please Sign In</h1>
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <button
              className="btn btn1"
              onClick={handleLogin}
              disabled={miniLoading}
            >
              {miniLoading ? <LoadingSpinner /> : "Sign in"}
            </button>
          </div>

          <div className="signup_right_logo"></div>
        </div>
      );
    }
  }
};

export default Signin;
