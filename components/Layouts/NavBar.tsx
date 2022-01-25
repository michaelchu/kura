import React from "react";
import { useRouter } from "next/router";
import useSession from "../../hooks/useSession";
import useStorage from "../../hooks/useStorage";
import NavDropdown from "./NavDropdown";
import Nav from "./Nav";
import Link from "next/link";
import { ApolloConsumer } from "@apollo/client";

export default function NavBar({ toggleModal }) {
  const router = useRouter();
  const isSignedIn = useSession();
  const { removeItem } = useStorage();

  return (
    <ApolloConsumer>
      {(client) => (
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
              <Link href=".">
                <a>
                  <img
                    src="/logo-dark.png"
                    width="110"
                    height="32"
                    alt="kura"
                    className="navbar-brand-image"
                  />
                </a>
              </Link>
            </h1>
            {isSignedIn && (
              <NavDropdown
                signOut={() => {
                  client.resetStore().then(() => {
                    removeItem("token");
                    router.push("/login");
                  });
                }}
                router={router}
                toggleModal={toggleModal}
              />
            )}
            {isSignedIn && <Nav router={router} />}
            {!isSignedIn && (
              <div className="navbar-nav flex-row order-md-last">
                <div className="nav-item dropdown me-3">
                  <Link href="/login">
                    <a className="nav-link px-0">Login</a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>
      )}
    </ApolloConsumer>
  );
}
