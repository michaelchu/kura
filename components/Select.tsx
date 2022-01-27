import React from "react";

export default function Select(props) {
  return (
    <select
      className={props.className}
      name={props.name}
      onChange={(e) => {
        props.onChange(e);
      }}
    >
      {props.defaultValue?.value && <option value={""} selected />}
      {props.options.map(({ label, value }) => (
        <option value={value} selected={value == props.defaultValue?.value}>
          {label}
        </option>
      ))}
    </select>
  );
}
