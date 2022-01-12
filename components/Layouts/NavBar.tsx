import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import { IconUser, IconPlus } from "@tabler/icons";
import { NavDropdown } from "./NavDropdown";

export default function NavBar({ toggleModal }) {
  const router = useRouter();
  const { signOut, isSignedIn } = useAuth();

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
        {isSignedIn() && <NavDropdown signOut={signOut} router={router} />}
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
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
