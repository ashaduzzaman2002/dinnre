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
  const [isMounted, setIsMounted] = useState(true);

  const [miniLoading, setMiniLoading] = useState(false);
  const [showOtp, setOtp] = useState(false);

  const [pinValues, setPinValues] = useState(["", "", "", "", "", ""]);

  const handlePinInputChange = (index, value) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
  };

  const handleLogin = async () => {
    setMiniLoading(true);
    try {
      const { data } = await dbObject.post("/register", {
        ...input,
        otp: pinValues.join(""),
      });
      console.log(data);
      if (data.success) {
        toast.success(data.msg, tostOptions);
        setTimeout(() => {
          //   if (isMounted) {
          //     setProfile(data?.user);
          //     navigate("/");
          //     setMiniLoading(false);
          //   }
        }, 1000);
      } else {
        toast.error(data.msg, tostOptions);
        setMiniLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (isMounted) {
        toast.error(error?.response?.data?.msg, tostOptions);
      }
      setMiniLoading(false);
    }
  };

  const sendOtp = async () => {
    setMiniLoading(true);
    try {
      const { data } = await dbObject.post("/send-otp", { email: input.email });
      console.log(data);
      if (data.success) {
        toast.success(data.msg, tostOptions);

        if (isMounted) {
          setOtp(true);
          setMiniLoading(false);
        }
      } else {
        toast.error(data.msg, tostOptions);
        setMiniLoading(false);
      }
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.msg, tostOptions);
      setMiniLoading(false);
    }
  };

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
          {!showOtp ? (
            <div className="box signup_box">
              <h1>Please Signup</h1>
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
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
              <button
                className="btn btn1"
                onClick={sendOtp}
                disabled={miniLoading}
              >
                {miniLoading ? <LoadingSpinner /> : "Signup"}
              </button>

              <div>OR</div>
              <Link
                className="text-secondary text-decoration-none d-flex gap-1"
                to={"/signin"}
              >
                Already Have and account?{" "}
                <Text
                  decoration={"underline"}
                  color={"green"}
                  fontWeight={"500"}
                  fontSize="2xl"
                >
                  Signin
                </Text>
              </Link>
            </div>
          ) : (
            <div className="box signup_box">
              <h1>Verify OTP</h1>
              <HStack pr={30} pl={30}>
                <PinInput otp>
                  {pinValues.map((value, index) => (
                    <PinInputField
                      key={index}
                      value={value}
                      onChange={(e) =>
                        handlePinInputChange(index, e.target.value)
                      }
                    />
                  ))}
                </PinInput>
              </HStack>
              <Text style={{ cursor: "pointer" }}>Resend OTP</Text>

              <button
                className="btn btn1 w-50"
                onClick={handleLogin}
                disabled={miniLoading}
              >
                {miniLoading ? <LoadingSpinner /> : "Verify"}
              </button>
            </div>
          )}

          <div className="signup_right_logo"></div>
        </div>
      );
    }
  }
};

export default Register;
