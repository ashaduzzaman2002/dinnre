import React, { useContext, useEffect, useState } from "react";
import "./auth.css";
import { dbObject } from "../../helper/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Toastify, { tostOptions } from "../../components/Toastify/Toastify";
import { toast } from "react-toastify";
import LoadingScreens from "../../components/laoding/LoadingScreens";
import { HStack, PinInput, PinInputField, Text } from "@chakra-ui/react";
import { AppContext } from "../../context/AppContext";

import { useFormik } from "formik";
import FormButton from "../../components/button/FormButton";
import { otpSchema } from "../../validation/FormValidation";
import FormInput from "../../components/input/FormInput";

const Register = () => {
  const initialOtp = {
    email: "",
    password: "",
  };

  // States
  const [input, setInput] = useState({ email: "", password: "" });
  const [otpError, setOtpError] = useState(null);
  const { setProfile, loading, profile } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
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
  const handleRegister = async (e) => {
    e.preventDefault();
    setMiniLoading(true);
    setOtpError(null);
    try {
      if (pinValues.length !== 6) {
        setMiniLoading();
        return setOtpError("OTP must be 6 digit");
      }

      const { data } = await dbObject.post("/register", {
        ...input,
        otp: pinValues.join(""),
      });
      console.log(data);
      if (data.success) {
        toast.success(data.msg, tostOptions);
        setTimeout(() => {
          navigate("/create-profile");
          setProfile(data?.user);
          setMiniLoading(false);
        }, 1000);
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

  // Send OTP
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialOtp,
      validationSchema: otpSchema,
      onSubmit: async (values) => {
        setMiniLoading(true);
        try {
          const { data } = await dbObject.post("/send-otp", {
            email: values.email,
          });
          console.log(data);
          if (data.success) {
            toast.success(data.msg, tostOptions);

            setOtp(true);
            setMiniLoading(false);
            setSeconds(60);
            setIsTimerRunning(true);
            setInput({
              ...input,
              email: values.email,
              password: values.password,
            });
          } else {
            toast.error(data.msg, tostOptions);
            setMiniLoading(false);
          }
        } catch (error) {
          console.log(error);

          toast.error(error?.response?.data?.msg, tostOptions);
          setMiniLoading(false);
        }
      },
    });

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
            <form onSubmit={handleSubmit} className="box signup_box">
              <h1>Please Signup</h1>

              <FormInput
                errors={errors}
                name={"email"}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                touched={touched}
                placeholder='Enter Email'
              />

              <FormInput
                errors={errors}
                name={"password"}
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                touched={touched}
                placeholder='Enter Password'
              />

              <FormButton miniLoading={miniLoading} title="Signup" />

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
            <form onSubmit={handleRegister} className="box signup_box">
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

              {otpError ? (
                <div className="errorMessage">
                  <small className="ms-2">{otpError}</small>
                </div>
              ) : null}
              {isTimerRunning ? (
                <Text>Resend OTP in: {seconds} seconds</Text>
              ) : (
                <Text onClick={handleSubmit} style={{ cursor: "pointer" }}>
                  Resend OTP
                </Text>
              )}

              <FormButton
                width="w-50"
                miniLoading={miniLoading}
                title="Verify"
              />
            </form>
          )}

          <div className="signup_right_logo"></div>
        </div>
      );
    }
  }
};

export default Register;
