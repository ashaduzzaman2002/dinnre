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

const CreateProfile = () => {
  const [input, setInput] = useState({ name: "", location: "", city: "" });
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

  const [image, setImage] = useState();

  const fileUpload = (e) => {
    // setInputs({ ...inputs, file: e.target.files[0] });
    setImage(e.target.files[0]);
  };



  if (loading) {
    return <LoadingScreens />;
  } else {
    return (
      <div className="signup_container">
        <Toastify />

        <div className="signup_left_logo"></div>

        <div className="box signup_box">
          <h1>Create Profile</h1>

          <div className="profile-image">
            <div className="h-100 w-100 profile-inner position-relative d-flex flex-column align-items-center justify-content-center gap-1">
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
          </div>
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            value={input.city}
            onChange={(e) => setInput({ ...input, city: e.target.value })}
          />

          <input
            type="text"
            name="location"
            placeholder="Enter Location"
            value={input.location}
            onChange={(e) => setInput({ ...input, location: e.target.value })}
          />
          <button
            className="btn btn1"
            onClick={handleLogin}
            disabled={miniLoading}
          >
            {miniLoading ? <LoadingSpinner /> : "Create"}
          </button>
        </div>

        <div className="signup_right_logo"></div>
      </div>
    );
  }
};

export default CreateProfile;
