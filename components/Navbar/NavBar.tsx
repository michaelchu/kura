import Link from "next/link";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  return (
    <Navbar variant="dark" className="navbar-overlap d-print-none">
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
          <NavDropdown
            title="Michael Chu"
            id="basic-nav-dropdown"
            className="nav-item dropdown"
          >
            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
        </div>
        <Nav className="collapse navbar-collapse">
          <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
            <Link href="/">
              <a className="nav-link">
                <span className="nav-link-title">Dashboard</span>
              </a>
            </Link>
            <Link href="/schedule">
              <a className="nav-link">
                <span className="nav-link-title">Schedule</span>
              </a>
            </Link>
            <Link href="/transactions">
              <a className="nav-link">
                <span className="nav-link-title">Transactions</span>
              </a>
            </Link>
          </div>
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavBar;
