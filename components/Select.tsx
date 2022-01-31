import React from "react";
import { nanoid } from "nanoid";

export default function Select(props) {
  return (
    <select
      onChange={(e) => {
        props.onChange(e);
      }}
      value={props.defaultValue}
      {...props}
    >
      <option value={""}>{""}</option>
      {props.options.map(({ label, value }, i) => (
        <option key={i} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
