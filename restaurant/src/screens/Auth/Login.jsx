import React, { useContext, useEffect, useState } from "react";
import "./auth.css";
import { dbObject } from "../../helper/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Toastify, { tostOptions } from "../../components/Toastify/Toastify";
import { toast } from "react-toastify";
import LoadingScreens from "../../components/laoding/LoadingScreens";
import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import { loginSchema } from "../../validation/FormValidation";
import FormInput from "../../components/input/FormInput";
import FormButton from "../../components/button/FormButton";
import {Text} from '@chakra-ui/react'

const Register = () => {
  // initial state
  const initialValues = {
    email: "",
    password: "",
  };


  const { setProfile, loading, profile } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [miniLoading, setMiniLoading] = useState(false);

  // handle login
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setMiniLoading(true);
        try {
          const { data } = await dbObject.post("/login", values);
          console.log(data);
          if (data.success) {
            toast.success(data.msg, tostOptions);
            setTimeout(() => {
              setProfile(data?.user);
              navigate("/");
              setMiniLoading(false);
            }, 1000);
          } else {
            toast.error(data.msg, tostOptions);
            setMiniLoading(false);
          }
        } catch (error) {
          console.log(error?.response?.data?.msg);
          console.log(error?.response?.data?.msg);

          toast.error(error?.response?.data?.msg, tostOptions);

          setMiniLoading(false);
        }
      },
    });

  useEffect(() => {
    if (profile) return navigate(location.state?.from || "/");
  }, [profile]);

  if (loading) {
    return <LoadingScreens />;
  } else {
    return (
      <div className="signup_container">
        <Toastify />

        <div className="signup_left_logo"></div>

        <form onSubmit={handleSubmit} className="box signup_box">
          <h1>Please Signin</h1>

          <FormInput
            errors={errors}
            name={"email"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="Enter Email"
          />

          <FormInput
            errors={errors}
            name={"password"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="Enter Password"
          />

          <FormButton miniLoading={miniLoading} title={"Signin"} />

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
        </form>

        <div className="signup_right_logo"></div>
      </div>
    );
  }
};

export default Register;
