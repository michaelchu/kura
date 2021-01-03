import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./Navbar/NavBar";
import React from "react";

const Layout = (props) => (
  <div>
    <Header />
    <div className="page">
      <NavBar />
      <div className="content">
        <div className="container-xl">{props.children}</div>
        <Footer />
      </div>
    </div>
  </div>
);

export default Layout;
