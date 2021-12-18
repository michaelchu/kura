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
import { IconChevronUp, IconChevronDown } from "@tabler/icons";

import TransactionTableHeader from "./TransactionTableHeader";
import TableFooter from "../TableFooter";

import EditTransactionModal from "../../Modals/EditTransactionModal";
import AddTransactionModal from "../../Modals/AddTransactionModal";

import DELETE_TRANSACTION from "../../../api/mutations/DeleteTransaction.graphql";
import UPDATE_TRANSACTION from "../../../api/mutations/UpdateTransaction.graphql";
import ADD_TRANSACTION from "../../../api/mutations/AddTransaction.graphql";

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_GQL_ENDPOINT, {
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export default function TransactionTable({ cols, data }) {
  const queryClient = useQueryClient();

  const { isShowing: isEditModalShowing, toggle: editModalToggle } = useModal();
  const { isShowing: isAddModalShowing, toggle: addModalToggle } = useModal();
  const [transaction, setTransaction] = useState({});
  const [isOption, setIsOption] = useState(false);

  const columns = useMemo(() => cols, [cols]);
  const dataRows = useMemo(() => data.transaction_costs, [
    data.transaction_costs,
  ]);

  const addTrans = useMutation(
    (variables) => {
      return graphQLClient.request(ADD_TRANSACTION, variables);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetch_transactions").then(() => {
          setTransaction({});
          addModalToggle();
        });
      },
    }
  );
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
        setIsOption={setIsOption}
        addModalToggle={addModalToggle}
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

      <AddTransactionModal
        show={isAddModalShowing}
        accounts={data.accounts}
        isOption={isOption}
        handleClose={() => addModalToggle()}
        handleCloseAndAdd={(data) => {
          addTrans.mutate(data);
        }}
      />
      <EditTransactionModal
        show={isEditModalShowing}
        selectedTrans={transaction}
        accounts={data.accounts}
        handleClose={() => editModalToggle()}
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
