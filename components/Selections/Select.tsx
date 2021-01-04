import React from "react";
import { SelectProps } from "../../interfaces/app_interfaces";

const Select = ({ label, defaultValue, options }: SelectProps) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <select className="form-select" value={defaultValue}>
        {options.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
        ;
      </select>
    </div>
  );
};

export default Select;
