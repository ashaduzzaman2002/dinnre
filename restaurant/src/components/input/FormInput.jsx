import React, { useState } from "react";

const FormInput = ({
  name,
  errors,
  values,
  handleBlur,
  handleChange,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="w-90 position-relative">
        <input
          type={name === "password" && !showPassword ? "password" : "text"}
          name={name}
          placeholder="Enter Password"
          className={errors[name] && touched[name] ? "errorInput" : ""}
          value={values[name]}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        {name === "password" && (
          <div className="password-toggle">
            <i
              onClick={() => setShowPassword(!showPassword)}
              class={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}
            ></i>
          </div>
        )}
      </div>

      {errors[name] && touched[name] ? (
        <div className="errorMessage">
          <small className="">{errors[name]}</small>
        </div>
      ) : null}
    </>
  );
};

export default FormInput;
