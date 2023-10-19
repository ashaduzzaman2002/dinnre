import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import Signin from "./screens/Signin/Signin";
import Restaurants from "./screens/restaurants/Restaurants";
import Orders from "./screens/orders/Orders";
import Verify from "./screens/Verify/Verify";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/admin"} />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/restaurants" element={<Restaurants />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/verify" element={<Verify />} />
        <Route path="/admin/signin" element={<Signin />} />
      </Routes>
    </>
  );
};

export default App;
