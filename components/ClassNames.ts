import classNames from "classnames";

export const buyBgClass = (action) => {
  return classNames({
    "btn-teal": action == "BUY",
    "btn-outline-red": action == "SELL",
  });
};

export const sellBgClass = (action) => {
  return classNames({
    "btn-red": action == "SELL",
    "btn-outline-teal": action == "BUY",
  });
};

export const ctnBgClass = (action) => {
  return classNames({
    "bg-green-lt": action == "BUY",
    "bg-red-lt": action == "SELL",
    "bg-yellow-lt": action != "SELL" && action != "BUY",
  });
};
