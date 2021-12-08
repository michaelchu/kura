import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark">
      <div className="container-xl">
        <Navbar.Brand href="/">
          <img
            src="/logo-dark.svg"
            alt="zentracker"
            className="navbar-brand-image"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/transactions">Transactions</Nav.Link>
            <Nav.Link href="/open-positions">Open Positions</Nav.Link>
            <Nav.Link href="/closed-positions">Closed Positions</Nav.Link>
            <Nav.Link href="/analysis">Analysis</Nav.Link>
          </Nav>
          <Nav>
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
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
