import React, { useContext, useEffect, useState } from "react";
import "./auth.css";
import { dbObject } from "../../helper/api";
import { useNavigate } from "react-router-dom";
import Toastify, { tostOptions } from "../../components/Toastify/Toastify";
import { toast } from "react-toastify";
import LoadingScreens from "../../components/laoding/LoadingScreens";
import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import { createProfileSchema } from "../../validation/FormValidation";
import FormInput from "../../components/input/FormInput";
import FormButton from "../../components/button/FormButton";
import FormTextArea from "../../components/input/FormTextArea";

const CreateProfile = () => {
  // initial state
  const initialValues = {
    name: "",
    location: "",
    city: "",
    about: "",
  };
  // States
  const { setProfile, loading, profile } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [miniLoading, setMiniLoading] = useState(false);
  const [imageError, setImageError] = useState(null);

  // Redirect handler
  useEffect(() => {
    if (loading) {
      return;
    }
    if (!profile) {
      return navigate("/signin");
    }
  }, [profile, loading, navigate]);

  // handle create profile
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: createProfileSchema,
      onSubmit: async (values) => {
        setImageError(null);
        if (!image) return setImageError("Prolie Image is Required");
        console.log({ ...values, file: image });

        setMiniLoading(true);

        const formatData = new FormData();
        formatData.append("file", image, image.name);
        formatData.append("name", values.name);
        formatData.append("location", values.location);
        formatData.append("city", values.city);
        formatData.append("about", values.about);

        try {
          const { data } = await dbObject.put("/create-account", formatData);
          console.log(data);

          if (data.success) {
            toast.success(data.msg, tostOptions);
            setTimeout(() => {
              setProfile(data?.user);
              navigate("/add-bank");
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

  const [image, setImage] = useState();

  const fileUpload = (e) => {
    setImage(e.target.files[0]);
  };

  if (loading) {
    return <LoadingScreens />;
  } else {
    return (
      <div className="signup_container">
        <Toastify />

        <div className="signup_left_logo"></div>

        <form onSubmit={handleSubmit} className="box signup_box">
          <h1>Create Profile</h1>

          <div className={`profile-image`}>
            <div
              className={`h-100 w-100 profile-inner position-relative d-flex flex-column align-items-center justify-content-center gap-1 ${
                imageError ? "errorInput" : ""
              }`}
            >
              <input
                onChange={fileUpload}
                type="file"
                className="h-100"
                style={{ background: "none", border: "none" }}
              />

              {image ? (
                <img
                  className="w-100 h-100 object-fit-cover"
                  style={{ borderRadius: 8 }}
                  src={URL.createObjectURL(image)}
                />
              ) : (
                <>
                  {" "}
                  <i
                    class="bi bi-cloud-upload text-secondary"
                    style={{ fontSize: "22px" }}
                  ></i>
                  <p className="mb-0 text-secondary">click to upload</p>
                </>
              )}
            </div>

            {imageError ? (
              <div className="errorMessage mt-1 d-flex justify-content-center w-100">
                <small style={{ fontSize: 12 }} className="text-center">
                  {imageError}
                </small>
              </div>
            ) : null}
          </div>

          <FormInput
            errors={errors}
            name={"name"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="Restaurant Name"
          />

          <FormInput
            errors={errors}
            name={"city"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="Enter City"
          />

          <FormInput
            errors={errors}
            name={"location"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="Enter Location"
          />

          <FormTextArea
            errors={errors}
            name={"about"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            values={values}
            touched={touched}
            placeholder="Write a small description"
          />

          <FormButton miniLoading={miniLoading} title={"Create"} />
        </form>

        <div className="signup_right_logo"></div>
      </div>
    );
  }
};

export default CreateProfile;
