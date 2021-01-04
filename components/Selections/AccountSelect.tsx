import React from "react";
import Select from "./Select";

const AccountSelect = ({ defaultValue }) => {
  const actionTypes = [
    { value: "BTO", label: "Buy to Open" },
    { value: "BTC", label: "Buy to Close" },
    { value: "STO", label: "Sell to Open" },
    { value: "STC", label: "Sell to Close" },
  ];
  return (
    <Select
      label={"Action"}
      defaultValue={defaultValue}
      options={actionTypes}
    />
  );
};

export default AccountSelect;
