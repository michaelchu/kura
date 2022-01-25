import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import React from "react";
import Script from "next/script";
import useModal from "../../hooks/useModal";
import CustomToast from "../CustomToast";
import AddTransactionCanvas from "../Canvas/AddTransactionCanvas";

export default function Layout(props) {
  const { isShowing: isCanvasShowing, toggle: CanvasToggle } = useModal();
  const { isShowing: isFinishedToastShowing, toggle: showFinishedToastToggle } =
    useModal();
  const { isShowing: isErrorToastShowing, toggle: showErrorToastToggle } =
    useModal();

  return (
    <div>
      <Header />
      <NavBar canvasToggle={CanvasToggle} />
      <div className="page-wrapper">
        <div className="container-xl">{props.children}</div>
        <Footer />
      </div>
      <AddTransactionCanvas
        canvasToggle={CanvasToggle}
        show={isCanvasShowing}
      />
      <CustomToast
        style={{ background: "#2fb344", color: "#fff", border: 0 }}
        onClose={showFinishedToastToggle}
        show={isFinishedToastShowing}
        msg={"Transaction updated!"}
      />

      <CustomToast
        style={{ background: "#d63939", color: "#fff", border: 0 }}
        onClose={showErrorToastToggle}
        show={isErrorToastShowing}
        msg={"Error updating transaction!"}
      />
      <Script src="https://unpkg.com/@tabler/core@latest/dist/js/tabler.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/litepicker@2.0.11/dist/litepicker.js" />
    </div>
  );
}
