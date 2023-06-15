import React, { useState } from "react";

const InputForm = (props) => {
  const { label, errorMessage, handleChange, placeholder, id, ...inputProps } =
    props;

  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  console.log(errorMessage);
  return (
    <div className="parent-one-input">
      <label className="label">{label}</label>
      <input
        onChange={handleChange}
        {...inputProps}
        onBlur={handleFocus}
        onFocus={() => inputProps.name == "confirmPassword" && setFocused(true)}
        focused={focused.toString()}
      />
      <span className="error-message">{errorMessage}</span>
    </div>
  );
};

export default InputForm;
