import React from "react";
import { nanoid } from "nanoid";

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
      <option key={nanoid()} value={""}>
        {""}
      </option>
      {props.options.map(({ label, value }) => (
        <option key={nanoid()} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
