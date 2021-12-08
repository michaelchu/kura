import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";

export default function TransactionTableRT({ cols, data, onEdit, onDelete }) {
  const columns = useMemo(() => cols, [cols]);
  const dataRows = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: columns,
      data: dataRows,
    },
    useSortBy
  );

  return (
    <div className="card">
      <Table
        responsive
        hover={true}
        striped={true}
        borderless={true}
        className={"card-table table-vcenter"}
        {...getTableProps}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <IconChevronDown />
                      ) : (
                        <IconChevronUp />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
              <th className="w-1"></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td className="text-end">
                  <div className="btn-list flex-nowrap">
                    <Button
                      variant="light"
                      size="sm"
                      onClick={() => onEdit(row.original)}
                    >
                      <i
                        className="ti ti-edit"
                        style={{ fontSize: "1.25rem" }}
                      ></i>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onDelete(row.original)}
                    >
                      <i
                        className="ti ti-trash"
                        style={{ fontSize: "1.25rem" }}
                      ></i>
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
