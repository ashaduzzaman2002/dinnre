import React from "react";

const LoadingSecond = () => {
  return (
    <div
      className="spinner-border text-primary"
      style={{ width: "2rem", height: "2rem" }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSecond;
