import React from "react";

const Input = ({ name, value, label, options, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        className="form-control"
      >
        <option value="" />
        {options.map((option) => {
          return (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger mt-2">{error}</div>}{" "}
    </div>
  );
};

export default Input;
