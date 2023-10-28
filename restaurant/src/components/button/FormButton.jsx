import React from "react";
import LoadingSpinner from "../laoding/LoadingSpinner";

const FormButton = ({ miniLoading, onClick }) => {
  return (
    <button
      className={`btn btn1`}
      onClick={onClick}
      disabled={miniLoading}
    >
      {miniLoading ? <LoadingSpinner /> : "Signup"}
    </button>
  );
};

export default FormButton;
