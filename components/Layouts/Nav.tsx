import React from "react";
import Link from "next/link";

export default function Nav({ router }) {
  return (
    <div className="collapse navbar-collapse" id="navbar-menu">
      <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
        <ul className="navbar-nav">
          <li
            className={
              router.pathname == "/dashboard" ? "nav-item active" : "nav-item"
            }
          >
            <Link href="/dashboard">
              <a className="nav-link">
                <span className="nav-link-title">Dashboard</span>
              </a>
            </Link>
          </li>
          <li
            className={
              router.pathname == "/closed-positions"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link href="/closed-positions">
              <a className="nav-link">
                <span className="nav-link-title">Closed Positions</span>
              </a>
            </Link>
          </li>
          <li
            className={
              router.pathname == "/transactions"
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link href="/transactions">
              <a className="nav-link">
                <span className="nav-link-title">Transactions</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
