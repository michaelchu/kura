import React from "react";

const NavDropDown = ({ image, dropDownItems }) => (
  <div className="nav-item dropdown">
    <a
      href="#"
      className="nav-link d-flex lh-1 text-reset p-0"
      data-bs-toggle="dropdown"
      aria-label="Open user menu"
    >
      <span className="avatar avatar-sm" style={{ backgroundImage: image }} />
      <div className="d-none d-xl-block ps-2">
        <div>Michael Chu</div>
      </div>
    </a>
    <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
      <a href="#" className="dropdown-item">
        Profile & account
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
);

export default NavDropDown;
