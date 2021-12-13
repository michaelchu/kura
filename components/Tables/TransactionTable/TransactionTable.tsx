import React, { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import useModal from "../../../hooks/useModal";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";

import TransactionTableHeader from "./TransactionTableHeader";
import TableFooter from "../TableFooter";

import EditTransactionModal from "../../Modals/EditTransactionModal";

import DELETE_TRANSACTION from "../../../api/graphql/mutations/DeleteTransaction.graphql";
import UPDATE_TRANSACTION from "../../../api/graphql/mutations/UpdateTransaction.graphql";

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export default function TransactionTable({ cols, data }) {
  const queryClient = useQueryClient();

  const { isShowing: isEditModalShowing, toggle: editModalToggle } = useModal();
  const {
    isShowing: isDeleteModalShowing,
    toggle: deleteModalToggle,
  } = useModal();

  const [transaction, setTransaction] = useState({});

  const columns = useMemo(() => cols, [cols]);
  const dataRows = useMemo(() => data.transactions, [data.transactions]);

  const deleteTrans = useMutation(
    (variables) => {
      return graphQLClient.request(DELETE_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions").then(() => {
          editModalToggle();
          setTransaction({});
        });
      },
    }
  );

  const updateTrans = useMutation(
    (variables) => {
      return graphQLClient.request(UPDATE_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient
          .invalidateQueries("fetch_transactions")
          .then(() => editModalToggle());
      },
    }
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
        setTransaction={setTransaction}
        accounts={data.accounts}
      />
      <Table
        responsive
        hover={true}
        striped={true}
        borderless={true}
        className={"card-table table-vcenter table-sm"}
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

      <EditTransactionModal
        show={isEditModalShowing}
        selectedTrans={transaction}
        accounts={data.accounts}
        handleClose={() => {
          editModalToggle();
        }}
        handleCloseAndUpdate={(data) => {
          updateTrans.mutate(data);
        }}
        handleCloseAndDelete={(id) => {
          deleteTrans.mutate({ id: id } as any);
        }}
      />
    </div>
  );
}
