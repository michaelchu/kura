import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import React from "react";
import Script from "next/script";

const Layout = (props) => (
  <div>
    <Header />
    <NavBar />
    <div className="page-wrapper">
      <div className="container-xl">{props.children}</div>
      <Footer />
    </div>
    <Script src="https://unpkg.com/@tabler/core@latest/dist/js/tabler.min.js" />
  </div>
);

export default Layout;
