import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import React from "react";
import Script from "next/script";
import useToggle from "../../hooks/useToggle";
import AddTransactionCanvas from "../Canvas/AddTransactionCanvas";
import { GlobalContext } from "../../contexts/context";

export default function Layout(props) {
  const { isTrue: isCanvasShowing, toggle: CanvasToggle } = useToggle();
  return (
    <div>
      <Header />
      <NavBar />
      <div className="page-wrapper">
        <GlobalContext.Provider value={{ canvasToggle: CanvasToggle }}>
          {props.children}
        </GlobalContext.Provider>
        <Footer />
      </div>
      <AddTransactionCanvas
        canvasToggle={CanvasToggle}
        show={isCanvasShowing}
      />
      <Script src="https://unpkg.com/@tabler/core@latest/dist/js/tabler.min.js" />
    </div>
  );
}
