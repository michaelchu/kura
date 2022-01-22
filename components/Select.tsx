import React from "react";

export default function Select({ name, onChange, defaultValue, options }) {
  return (
    <select
      className={"form-select"}
      name={name}
      onChange={(e) => {
        onChange(e);
      }}
    >
      {/*<option disabled selected hidden value={""}>*/}
      {/*  {""}*/}
      {/*</option>*/}
      {options.map(({ label, value }) => (
        <option value={value} selected={value == defaultValue.value}>
          {label}
        </option>
      ))}
    </select>
  );
}
