import Link from "next/link";
import NavDropDown from "./NavDropDown";
import React from "react";

const NavBar = () => {
  const dropdownItems = {};

  return (
    <header className="navbar navbar-expand-md navbar-dark navbar-overlap d-print-none">
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
              src="/logo-white.svg"
              width="110"
              height="32"
              alt="Tabler"
              className="navbar-brand-image"
            />
          </a>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          <NavDropDown
            image={`url("/avatars/002m.jpg")`}
            dropDownItems={dropdownItems}
          />
        </div>
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link">
                    <span className="nav-link-title">Dashboard</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/schedule">
                  <a className="nav-link" href="./form-elements.html">
                    <span className="nav-link-title">Schedules</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/transactions">
                  <a className="nav-link">
                    <span className="nav-link-title">Transactions</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
