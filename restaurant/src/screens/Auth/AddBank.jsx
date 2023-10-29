import React, { useContext, useEffect, useState } from "react";
import "./auth.css";
import { dbObject } from "../../helper/api";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Toastify, { tostOptions } from "../../components/Toastify/Toastify";
import { toast } from "react-toastify";
import LoadingScreens from "../../components/laoding/LoadingScreens";
import LoadingSpinner from "../../components/laoding/LoadingSpinner";
import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import { bankSchema } from "../../validation/FormValidation";
import FormButton from "../../components/button/FormButton";
import FormInput from "../../components/input/FormInput";

const AddBank = () => {
  const initialValue = {
    bankName: "",
    ifsc: "",
    accountNo: "",
    upi: "",
    accountHolder: "",
  };

  const { setProfile, loading, profile } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!profile) {
      return navigate("/signin");
    }
  }, [profile, loading, navigate]);
  const [miniLoading, setMiniLoading] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: initialValue,
      validationSchema: bankSchema,
      onSubmit: async (values) => {
        setMiniLoading(true);
        try {
          const { data } = await dbObject.put("/add-bank", values);
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
          console.log(error);
          toast.error(error?.response?.data?.msg, tostOptions);
          setMiniLoading(false);
        }
      },
    });

  if (loading) {
    return <LoadingScreens />;
  } else {
    return (
      <div className="signup_container">
        <Toastify />

        <div className="signup_left_logo"></div>

        <form onSubmit={handleSubmit} className="box signup_box">
          <h1>Add Bank</h1>

          <FormInput
            errors={errors}
            name={"bankName"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="Bank Name"
          />

          <FormInput
            errors={errors}
            name={"accountHolder"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="Account Holder Name"
          />

          <FormInput
            errors={errors}
            name={"accountNo"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="Account Number"
          />

          <FormInput
            errors={errors}
            name={"ifsc"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="IFSC Code"
          />

          <FormInput
            errors={errors}
            name={"upi"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="UPI Id"
          />
          <FormButton title={"Add"} miniLoading={miniLoading} />
        </form>

        <div className="signup_right_logo"></div>
      </div>
    );
  }
};

export default AddBank;
