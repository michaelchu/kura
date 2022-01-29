import React from "react";

export default function Select(props) {
  return (
    <select
      className={props.className}
      name={props.name}
      onChange={(e) => {
        props.onChange(e);
      }}
      value={props.defaultValue}
    >
      <option value={""}>{""}</option>
      {props.options.map(({ label, value }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  );
}
