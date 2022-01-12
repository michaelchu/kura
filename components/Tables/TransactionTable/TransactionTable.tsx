import React, { useMemo } from "react";
import { useQueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Table from "react-bootstrap/Table";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";

import TransactionTableHeader from "./TransactionTableHeader";
import TableFooter from "../TableFooter";

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export default function TransactionTable({
  cols,
  data,
  setTransaction,
  editModalToggle,
}) {
  const columns = useMemo(() => cols, [cols]);
  const dataRows = useMemo(
    () => data.transactions,
    [data.transactions]
  );

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
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: dataRows,
      initialState: {
        pageSize: 25,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div className="card">
      <TransactionTableHeader
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
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{ textAlign: "center" }}
            >
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
                  <div>
                    <a
                      onClick={() => {
                        setTransaction(row.original);
                        editModalToggle();
                      }}
                    >
                      {" "}
                      <i
                        className="ti ti-edit"
                        style={{ fontSize: "1rem" }}
                      />{" "}
                    </a>
                  </div>
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
    </div>
  );
}
