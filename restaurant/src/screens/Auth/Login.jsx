import React, { useContext, useEffect, useState } from "react";
import "./auth.css";
import { dbObject } from "../../helper/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Toastify, { tostOptions } from "../../components/Toastify/Toastify";
import { toast } from "react-toastify";
import LoadingScreens from "../../components/laoding/LoadingScreens";
import LoadingSpinner from "../../components/laoding/LoadingSpinner";
import { Box, HStack, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { AppContext } from "../../context/AppContext";

const Register = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const { setProfile, loading, profile } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [miniLoading, setMiniLoading] = useState(false);

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

  useEffect(() => {
    if (profile) return navigate(location.state?.from || "/");
  }, [profile]);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const [pinValues, setPinValues] = useState(["", "", "", ""]);

  const handlePinInputChange = (index, value) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
  };

  console.log(pinValues.join(""));

  if (loading) {
    return <LoadingScreens />;
  } else {
    return (
      <div className="signup_container">
        <Toastify />

        <div className="signup_left_logo"></div>

        <div className="box signup_box">
          <h1>Please Signin</h1>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
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
            {miniLoading ? <LoadingSpinner /> : "Signin"}
          </button>

          <div>OR</div>
          <Link
            className="text-secondary text-decoration-none d-flex gap-1"
            to={"/signup"}
          >
            Don't Have an account?{" "}
            <Text
              decoration={"underline"}
              color={"green"}
              fontWeight={"500"}
              fontSize="2xl"
            >
              Signup
            </Text>
          </Link>
        </div>

        <div className="signup_right_logo"></div>
      </div>
    );
  }
};

export default Register;
