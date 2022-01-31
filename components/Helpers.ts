import dayjs from "dayjs";

export const actionTypes = [
  { value: "BUY", label: "Buy" },
  { value: "SELL", label: "Sell" },
  { value: "EXP", label: "Expired" },
  { value: "ASG", label: "Assignment" },
];

export const optionTypes = [
  { value: "C", label: "Call" },
  { value: "P", label: "Put" },
];

export const assetTypes = [
  { value: "stock", label: "Stock" },
  { value: "option", label: "Option" },
];

export const strategies = [
  { value: "stock", label: "Stock" },
  { value: "single", label: "Single Option" },
  { value: "covered-stock", label: "Covered Stock" },
];

export const getOptionByValue = (
  options: { value: string; label: string }[],
  value: string
) => {
  return options.find(
    (opt: { label: string; value: string }) => opt.value === value
  );
};

export const formatSymbol = (root, expiration, strike, optionType) => {
  if (expiration != "") {
    expiration = dayjs(expiration).format("DD MMM YY");
  }
  return `${root} ${expiration} ${strike} ${optionType}`.trim();
};

export const buyActions = (action) => {
  return action == "BUY" || action == "BTO" || action == "BTC";
};

export const sellActions = (action) => {
  return action == "SELL" || action == "STO" || action == "STC";
};
