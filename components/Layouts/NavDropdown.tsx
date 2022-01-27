import React from "react";
import { IconUser } from "@tabler/icons";

export default function NavDropdown({ signOut }) {
  return (
    <div className="nav-item dropdown">
      <a
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
        {/*<div className="dropdown-item">*/}
        {/*  <span>Dark Mode</span>*/}
        {/*  <div className="form-check form-check-single form-switch">*/}
        {/*    <input*/}
        {/*      className="form-check-input"*/}
        {/*      type="checkbox"*/}
        {/*      onChange={() => {*/}
        {/*        document.body.className == "theme-light"*/}
        {/*          ? (document.body.className = "theme-dark")*/}
        {/*          : (document.body.className = "theme-light");*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <a className="dropdown-item">Settings</a>
        <a
          className="dropdown-item"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </a>
      </div>
    </div>
  );
}
