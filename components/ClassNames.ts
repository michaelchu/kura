import classNames from "classnames";
import { buyActions, sellActions } from "./Helpers";

export const buyBgClass = (action) => {
  return classNames({
    "btn-teal": buyActions(action),
    "btn-outline-red": sellActions(action),
    "btn-outline-yellow": action == "EXP" || action == "ASN",
  });
};

export const asnBgClass = (action) => {
  return classNames({
    "btn-yellow": action == "ASN",
    "btn-outline-teal": buyActions(action),
    "btn-outline-red": sellActions(action),
    "btn-outline-yellow": action == "EXP",
  });
};

export const expBgClass = (action) => {
  return classNames({
    "btn-yellow": action == "EXP",
    "btn-outline-red": sellActions(action),
    "btn-outline-teal": buyActions(action),
    "btn-outline-yellow": action == "ASN",
  });
};

export const sellBgClass = (action) => {
  return classNames({
    "btn-red": sellActions(action),
    "btn-outline-teal": buyActions(action),
    "btn-outline-yellow": action == "EXP" || action == "ASN",
  });
};

export const ctnBgClass = (action) => {
  return classNames({
    "bg-green-lt": buyActions(action),
    "bg-red-lt": sellActions(action),
    "bg-yellow-lt": action == "EXP" || action == "ASN",
  });
};

export const btnSubmitClass = (loading, color) => {
  return classNames(`btn btn-${color} w-100`, { "btn-loading": loading });
};
