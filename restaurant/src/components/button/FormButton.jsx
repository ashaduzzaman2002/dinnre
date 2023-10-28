import React from "react";
import LoadingSpinner from "../laoding/LoadingSpinner";

const FormButton = ({ miniLoading }) => {
  return (
    <button
      type="submit"
      className={`btn btn1`}
      disabled={miniLoading}
    >
      {miniLoading ? <LoadingSpinner /> : "Signup"}
    </button>
  );
};

export default FormButton;
