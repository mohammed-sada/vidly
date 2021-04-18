import React from "react";

const Input = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <input
        type="search"
        className="form-control my-3"
        value={value}
        placeholder="Search"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
