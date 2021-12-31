import React from "react";
import { useRouter } from "next/router";
import { IconUser, IconPlus } from "@tabler/icons";

export default function NavBar({ toggleModal }) {
  const router = useRouter();
  return (
    <header className="navbar navbar-expand-md navbar-dark sticky-top d-print-none">
      <div className="container-xl">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-menu"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href=".">
            <img
              src="/logo-dark.png"
              width="110"
              height="32"
              alt="kura"
              className="navbar-brand-image"
            />
          </a>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item dropdown me-3">
            <a href="#" className="nav-link px-0" onClick={() => toggleModal()}>
              <IconPlus />
            </a>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
            >
              <span className="avatar avatar-sm">
                <IconUser />
                <span className="badge bg-red" />
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <a href="#" className="dropdown-item">
                Profile & account
              </a>
              <a href="#" className="dropdown-item">
                Feedback
              </a>
              <div className="dropdown-divider" />
              <div className="dropdown-item">
                <span>Dark Mode</span>
                <div className="form-check form-check-single form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => {
                      document.body.className == "theme-light"
                        ? (document.body.className = "theme-dark")
                        : (document.body.className = "theme-light");
                    }}
                  />
                </div>
              </div>
              <a href="#" className="dropdown-item">
                Settings
              </a>
              <a href="#" className="dropdown-item">
                Logout
              </a>
            </div>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
            <ul className="navbar-nav">
              <li
                className={
                  router.pathname == "/dashboard"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <a className="nav-link" href="/dashboard">
                  <span className="nav-link-title">Dashboard</span>
                </a>
              </li>
              <li
                className={
                  router.pathname == "/closed-positions"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <a className="nav-link" href="/closed-positions">
                  <span className="nav-link-title">Closed Positions</span>
                </a>
              </li>
              <li
                className={
                  router.pathname == "/transactions"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <a className="nav-link" href="/transactions">
                  <span className="nav-link-title">Transactions</span>
                </a>
              </li>
              <li
                className={
                  router.pathname == "/goals" ? "nav-item active" : "nav-item"
                }
              >
                <a className="nav-link" href="/goals">
                  <span className="nav-link-title">Goals</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
