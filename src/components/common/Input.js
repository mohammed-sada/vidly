import React from "react";

const Input = ({ name, value, label, type, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        className="form-control"
        id={name}
      />
      {error && <div className="alert alert-danger mt-2">{error}</div>}{" "}
    </div>
  );
};

export default Input;
