import React, { useState } from "react";

const FormTextArea = ({
  name,
  errors,
  values,
  handleBlur,
  handleChange,
  touched,
  placeholder
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="w-90 position-relative">
        <textarea
        // style={{height: 'auto'}}
          type={name === "password" && !showPassword ? "password" : "text"}
          name={name}
          placeholder={placeholder}
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

export default FormTextArea;
