import Link from "next/link";
import Search from "./Search";

const NavBar = () => (
  <header className="navbar navbar-expand-md navbar-dark navbar-overlap d-print-none">
    <div className="container-xl">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-menu"
      >
        <span className="navbar-toggler-icon"></span>
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
        <div className="nav-item dropdown">
          <a
            href="#"
            className="nav-link d-flex lh-1 text-reset p-0"
            data-bs-toggle="dropdown"
            aria-label="Open user menu"
          >
            <span
              className="avatar avatar-sm"
              style={{ backgroundImage: `url("/avatars/000m.jpg")` }}
            ></span>
            <div className="d-none d-xl-block ps-2">
              <div>Michael Chu</div>
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <a href="#" className="dropdown-item">
              Profile & account
            </a>
            <div className="dropdown-divider"></div>
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
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
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
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Dashboard</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/schedule">
                <a className="nav-link" href="./form-elements.html">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
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
                      <polyline points="9 11 12 14 20 6" />
                      <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Schedules</span>
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/transactions">
                <a className="nav-link">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
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
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                      <line x1="9" y1="9" x2="10" y2="9" />
                      <line x1="9" y1="13" x2="15" y2="13" />
                      <line x1="9" y1="17" x2="15" y2="17" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Transactions</span>
                </a>
              </Link>
            </li>
          </ul>
          <div className="ms-md-auto ps-md-4 py-2 py-md-0 me-md-4 order-first order-md-last flex-grow-1 flex-md-grow-0">
            <Search />
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default NavBar;
