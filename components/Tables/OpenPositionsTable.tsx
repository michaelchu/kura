import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Table from "react-bootstrap/Table";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";

import TableFooter from "../Tables/TableFooter";

export default function OpenPositionsTable({
  cols,
  data,
  setSelectedTransaction,
  canvasToggle,
}) {
  const columns = useMemo(() => cols, [cols]);
  const dataRows = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    state,
  } = useTable(
    {
      columns: columns,
      data: dataRows,
      initialState: {
        pageSize: 50,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex } = state;

  return (
    <>
      <Table
        responsive
        hover={true}
        striped={false}
        borderless={false}
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
              <th className="w-1" />
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  {row.original["assetType"] == "option" && (
                    <div>
                      <a
                        onClick={() => {
                          setSelectedTransaction(row.original);
                          canvasToggle();
                        }}
                      >
                        {" "}
                        <i
                          className="ti ti-edit"
                          style={{ fontSize: "1rem" }}
                        />{" "}
                      </a>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TableFooter
        previousPage={previousPage}
        nextPage={nextPage}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        pageOptions={pageOptions}
        pageIndex={pageIndex}
        pageCount={pageCount}
        gotoPage={gotoPage}
      />
    </>
  );
}
