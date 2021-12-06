import React from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import accounting from "accounting";

export default function TransactionTable({
  cols,
  rows,
  formattedCols,
  hiddenCols,
  onEdit,
  onDelete,
}) {
  return (
    <div className="card">
      <Table
        responsive
        hover={true}
        striped={true}
        borderless={true}
        className={"card-table table-vcenter"}
      >
        <thead>
          <tr>
            {cols.map((col: string) => (
              <th key={col}>{col}</th>
            ))}
            <th className="w-1"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row: object, i: number) => (
            <tr>
              {Object.entries(row).map(([key, value], idx: number) => {
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
                <div className="btn-list flex-nowrap">
                  <Button variant="light" size="sm" onClick={() => onEdit(row)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(row)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
