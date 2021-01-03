import React from "react";
import Table from "react-bootstrap/Table";
import TransactionTableFilter from "./TransactionTableFilter";
const accounting = require("accounting");

const TransactionTable = ({
  cols,
  rows,
  title,
  formattedCols,
  hiddenCols,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      {/*<div className="card-body border-bottom py-3">*/}
      {/*  <TransactionTableFilter />*/}
      {/*</div>*/}
      <Table
        responsive
        hover={true}
        striped={true}
        borderless={true}
        className={"card-table table-vcenter text-nowrap datatable"}
      >
        <thead>
          <tr>
            {cols.map((col) => (
              <th key={col}>{col}</th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {Object.entries(row).map(([key, value]) => {
                if (!hiddenCols.includes(key)) {
                  return (
                    <td key={key}>
                      {formattedCols.includes(key)
                        ? accounting.formatMoney(value)
                        : value}
                    </td>
                  );
                }
              })}
              <td className="text-end">
                <span className="dropdown">
                  <button
                    className="btn dropdown-toggle align-text-top btn-sm"
                    data-bs-boundary="viewport"
                    data-bs-toggle="dropdown"
                  >
                    Actions
                  </button>
                  <div className="dropdown-menu dropdown-menu-end">
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => onEdit(row)}
                    >
                      Edit
                    </a>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => onDelete(row)}
                    >
                      Delete
                    </a>
                  </div>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <div><DataTableFooter data={data} /></div> */}
    </div>
  );
};

export default TransactionTable;
