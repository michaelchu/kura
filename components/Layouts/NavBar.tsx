import React from "react";
import { useRouter } from "next/router";
import { IconBell, IconSun, IconMoon } from "@tabler/icons";

export default function NavBar() {
  const router = useRouter();
  return (
    <header className="navbar navbar-expand-md navbar-dark d-print-none">
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
              alt="zentracker"
              className="navbar-brand-image"
            />
          </a>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          <a
            className="nav-link px-0 hide-theme-dark"
            onClick={() => (document.body.className = "theme-dark")}
            title={"Enable dark mode"}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
          >
            <IconMoon />
          </a>
          <a
            className="nav-link px-0 hide-theme-light"
            onClick={() => (document.body.className = "theme-light")}
            title={"Enable light mode"}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            style={{ color: "#f59f00" }}
          >
            <IconSun />
          </a>
          <div className="nav-item dropdown d-none d-md-flex me-3">
            <a
              href="#"
              className="nav-link px-0"
              data-bs-toggle="dropdown"
              tabIndex={-1}
              aria-label="Show notifications"
            >
              <IconBell />
              <span className="badge bg-red" />
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
              <div className="card">
                <div className="card-body">This is a notification</div>
              </div>
            </div>
          </div>
          <div className="nav-item dropdown">
            <a
              href="#"
              className="nav-link d-flex lh-1 text-reset p-0"
              data-bs-toggle="dropdown"
              aria-label="Open user menu"
            >
              <span
                className="avatar avatar-sm"
                style={{ backgroundImage: `url("/002m.jpg")` }}
              />
              <div className="d-none d-xl-block ps-2">
                <div>Michael Chu</div>
              </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <a href="#" className="dropdown-item">
                Profile & account
              </a>
              <a href="#" className="dropdown-item">
                Feedback
              </a>
              <div className="dropdown-divider" />
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
                  router.pathname == "/open-positions"
                    ? "nav-item active"
                    : "nav-item"
                }
              >
                <a className="nav-link" href="/open-positions">
                  <span className="nav-link-title">Open Positions</span>
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
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
