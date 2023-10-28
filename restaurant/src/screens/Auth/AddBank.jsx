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

const AddBank = () => {
  const [input, setInput] = useState({
    bankName: "",
    ifsc: "",
    accountNo: "",
    upi: "",
  });
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
          <h1>Add Bank</h1>

          <input
            className="errorInput"
            type="text"
            name="bankName"
            placeholder="Bank Name"
            value={input.bankName}
            onChange={(e) => setInput({ ...input, bankName: e.target.value })}
          />

          
          <input
            type="text"
            name="accountNo"
            placeholder="Account Number"
            value={input.accountNo}
            onChange={(e) => setInput({ ...input, accountNo: e.target.value })}
          />

          <input
            type="text"
            name="ifsc"
            placeholder="IFSC Code"
            value={input.ifsc}
            onChange={(e) => setInput({ ...input, ifsc: e.target.value })}
          />

          <input
            type="text"
            name="upi"
            placeholder="UPI id"
            value={input.upi}
            onChange={(e) => setInput({ ...input, upi: e.target.value })}
          />
          <button
            className="btn btn1"
            onClick={handleLogin}
            disabled={miniLoading}
          >
            {miniLoading ? <LoadingSpinner /> : "Add"}
          </button>
        </div>

        <div className="signup_right_logo"></div>
      </div>
    );
  }
};

export default AddBank;
