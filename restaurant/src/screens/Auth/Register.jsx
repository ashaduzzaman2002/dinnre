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

import { useFormik } from "formik";
import FormButton from "../../components/button/FormButton";
import { otpSchema } from "../../validation/FormValidation";

const Register = () => {
  const initialOtp = {
    email: "",
    password: "",
  };
  // States
  const [input, setInput] = useState({ email: "", password: "" });
  const { setProfile, loading, profile } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(true);
  const [seconds, setSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [miniLoading, setMiniLoading] = useState(false);
  const [showOtp, setOtp] = useState(false);

  const [pinValues, setPinValues] = useState(["", "", "", "", "", ""]);

  // Handle otp input
  const handlePinInputChange = (index, value) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
  };

  // Handle Register
  const handleRegister = async () => {
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
          if (isMounted) {
            setProfile(data?.user);
            navigate("/profile");
            setMiniLoading(false);
          }
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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialOtp,
      validationSchema: otpSchema,
      onSubmit: async (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });
  // Send OTP
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
          setSeconds(60);
          setIsTimerRunning(true);
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

  // Timer
  useEffect(() => {
    let timer;
    if (isTimerRunning && seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setIsTimerRunning(false);
    }

    return () => clearTimeout(timer);
  }, [isTimerRunning, seconds]);

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
      navigate(location.state?.from || "/");
      return null;
    } else {
      return (
        <div className="signup_container">
          <Toastify />

          <div className="signup_left_logo"></div>
          {!showOtp ? (
            <form className="box signup_box">
              <h1>Please Signup</h1>

              <input
                type="text"
                name="email"
                placeholder="Enter Email"
                className={errors.email && touched.email ? "errorInput" : ""}
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              {errors.email && touched.email ? (
                <div className="errorMessage">
                  <small className="">{errors.email}</small>
                </div>
              ) : null}

              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />

              <FormButton
                onClick={sendOtp}
                miniLoading={miniLoading}
                title="Signup"
              />

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
            </form>
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
              {isTimerRunning ? (
                <Text>Resend OTP in: {seconds} seconds</Text>
              ) : (
                <Text onClick={sendOtp} style={{ cursor: "pointer" }}>
                  Resend OTP
                </Text>
              )}

              <button
                className="btn btn1 w-50"
                onClick={handleRegister}
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
