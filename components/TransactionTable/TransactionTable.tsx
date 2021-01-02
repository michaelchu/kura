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
  onClick,
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
              <th>{col}</th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr>
              {Object.entries(row).map(([key, value]) => {
                if (!hiddenCols.includes(key)) {
                  return (
                    <td>
                      {formattedCols.includes(key)
                        ? accounting.formatMoney(value)
                        : value}
                    </td>
                  );
                }
              })}
              <td className="text-end">
                <a href="#" onClick={onClick}>
                  Edit
                </a>
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
