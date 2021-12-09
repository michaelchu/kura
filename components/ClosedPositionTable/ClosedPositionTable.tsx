import React, { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import Table from "react-bootstrap/Table";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";
import ClosedPositionTableHeader from "../ClosedPositionTable/ClosedPositionTableHeader";
import ClosedPositionTableFooter from "../ClosedPositionTable/ClosedPositionTableFooter";

export default function ClosedPositionTable({ cols, data }) {
  const columns = useMemo(() => cols, [cols]);
  const dataRows = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: dataRows,
    },
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state;

  return (
    <div className="card">
      <ClosedPositionTableHeader
        filter={globalFilter}
        setFilter={setGlobalFilter}
      />
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
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ClosedPositionTableFooter />
    </div>
  );
}
