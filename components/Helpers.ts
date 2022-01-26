import dayjs from "dayjs";

export const actionTypes = [
  { value: "BTO", label: "Buy to Open" },
  { value: "BTC", label: "Buy to Close" },
  { value: "STO", label: "Sell to Open" },
  { value: "STC", label: "Sell to Close" },
  { value: "EXP", label: "Expired" },
  { value: "ASG", label: "Assignment" },
];

export const optionTypes = [
  { value: "C", label: "Call" },
  { value: "P", label: "Put" },
];

export const option_strategies = [
  { value: "covered-stock", label: "Covered Stock" },
  { value: "single", label: "Single Option" },
];

export const stock_strategies = [
  { value: "stock", label: "Stock" },
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
