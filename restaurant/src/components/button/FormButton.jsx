import React from "react";
import LoadingSpinner from "../laoding/LoadingSpinner";

const FormButton = ({ miniLoading, width, title }) => {
  return (
    <button
      type="submit"
      className={`btn btn1 ${width}`}
      disabled={miniLoading}
    >
      {miniLoading ? <LoadingSpinner /> : title}
    </button>
  );
};

export default FormButton;
