import React from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons";
import _ from "lodash";

export default function TableFooter({
  previousPage,
  nextPage,
  canNextPage,
  canPreviousPage,
  pageOptions,
  pageIndex,
  pageCount,
  gotoPage,
}) {
  return (
    <>
      {pageOptions.length != 1 && (
        <div className="card-footer d-flex align-items-center">
          <ul className="pagination m-0 ms-auto">
            <li
              className={canPreviousPage ? "page-item" : "page-item disabled"}
            >
              <button
                className="page-link"
                disabled={!canPreviousPage}
                onClick={() => previousPage()}
              >
                <IconChevronLeft />
                prev
              </button>
            </li>
            {_.range(0, pageCount).map((idx) => {
              return (
                <li
                  key={idx + 1}
                  className={
                    pageIndex + 1 == idx + 1 ? "page-item active" : "page-item"
                  }
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => gotoPage(idx)}
                  >
                    {idx + 1}
                  </a>
                </li>
              );
            })}
            <li className={canNextPage ? "page-item" : "page-item disabled"}>
              <button
                className="page-link"
                disabled={!canNextPage}
                onClick={() => nextPage()}
              >
                next <IconChevronRight />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
