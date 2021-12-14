import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import React from "react";
import Script from "next/script";

export default function Layout(props) {
  return (
    <div>
      <Header />
      <NavBar />
      <div className="page-wrapper">
        <div className="container-xl">{props.children}</div>
        <Footer />
      </div>
      <Script src="https://unpkg.com/@tabler/core@latest/dist/js/tabler.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/litepicker@2.0.11/dist/litepicker.js" />
    </div>
  );
}
