import React, { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { GraphQLClient } from "graphql-request";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import useModal from "../../hooks/useModal";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { IconChevronUp, IconChevronDown } from "@tabler/icons";

import TransactionTableHeader from "../TransactionTable/TransactionTableHeader";
import TransactionTableFooter from "../TransactionTable/TransactionTableFooter";

import DeleteTransactionModal from "../../components/Modals/DeleteTransactionModal";
import EditTransactionModal from "../../components/Modals/EditTransactionModal";

import DELETE_TRANSACTION from "../../api/graphql/mutations/DeleteTransaction.graphql";
import UPDATE_TRANSACTION from "../../api/graphql/mutations/UpdateTransaction.graphql";

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
        queryClient.invalidateQueries("fetch_transactions");
        deleteModalToggle();
        setTransaction({});
      },
    }
  );

  const updateTrans = useMutation(
    (variables) => {
      return graphQLClient.request(UPDATE_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions");
        editModalToggle();
      },
    }
  );

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
                      onClick={() => {
                        setTransaction(row.original);
                        editModalToggle();
                      }}
                    >
                      <i
                        className="ti ti-edit"
                        style={{ fontSize: "1.25rem" }}
                      ></i>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setTransaction(row.original);
                        deleteModalToggle();
                      }}
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
      <TransactionTableFooter />

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
      />
      <DeleteTransactionModal
        show={isDeleteModalShowing}
        trans={transaction}
        handleClose={() => {
          deleteModalToggle();
        }}
        handleCloseAndDelete={(transId) => {
          deleteTrans.mutate({ id: transId } as any);
        }}
      />
    </div>
  );
}
