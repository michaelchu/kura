import React from "react";

const TransactionTableFooter = () => (
  <div className="card-footer d-flex align-items-center">
    <p className="m-0 text-muted">
      Showing <span>1</span> to <span>8</span> of <span>16</span> entries
    </p>
    <ul className="pagination m-0 ms-auto">
      <li className="page-item disabled">
        <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="15 6 9 12 15 18" />
          </svg>
          prev
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          1
        </a>
      </li>
      <li className="page-item active">
        <a className="page-link" href="#">
          2
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          3
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          4
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          5
        </a>
      </li>
      <li className="page-item">
        <a className="page-link" href="#">
          next{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
);

export default TransactionTableFooter;
