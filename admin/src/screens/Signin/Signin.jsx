import React, { useContext, useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import "./signin.css";
import { dbObject } from "../../helper/api";
// import { AppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import Toastify, { tostOptions } from "../../components/Toastify/Toastify";
import { toast } from "react-toastify";

const Signin = () => {
  const [input, setInput] = useState({ email: "", password: "" });
//   const { getUser, user, loading } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try {
      const { data } = await dbObject.post("/adminAuth/login", input);
      console.log(data);

      if (data.success) {
        toast.success(data.message, tostOptions);
        navigate('/')
        // setTimeout(() => {
        //   getUser();
        //   navigate(location?.state?.from || "/");
        // }, 1000);
      } else {
        toast.error(data.message, tostOptions);
      }
    } catch (error) {
      console.log(error);

      toast.error("Invalid credantioal", tostOptions);
    }
  };

//   useEffect(() => {
//     if (user) {
//       if (user.role === "admin" && location?.state?.from?.includes("admin")) {
//         navigate(location.state.from || "/admin/dashboard");
//       } else if (
//         user.role === "restaurant_owner" &&
//         location?.state?.from?.includes("restaurant")
//       ) {
//         navigate(location.state.from || "/restaurant/dashboard");
//       } else {
//         navigate("/");
//       }
//     }
//   }, [user]);

//   if (loading) {
//     return (
//       <div
//         id="spinner"
//         className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
//       >
//         <div
//           className="spinner-border text-primary"
//           style={{ width: "3rem", height: "3rem" }}
//           role="status"
//         >
//           <span className="sr-only">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (user) {
//     if (user.role === "admin" && location?.state?.from?.includes("admin")) {
//       navigate(location.state.from || "/admin/dashboard");
//       return null;
//     } else if (
//       user.role === "restaurant_owner" &&
//       location?.state?.from?.includes("restaurant")
//     ) {
//       navigate(location.state.from || "/restaurant/dashboard");
//       return null;
//     } else {
//       navigate("/");
//       return null;
//     }
//   } else {
    return (
      <Layout title={'Signin'}>
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
            <div className="btn btn1" onClick={handleLogin}>
              Sign in
            </div>
          </div>

          <div className="signup_right_logo"></div>
        </div>
      </Layout>
    );
//   }
};

export default Signin;