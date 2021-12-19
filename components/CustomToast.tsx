import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import React from "react";

export default function CustomToast({
  show,
  onClose,
  msg,
  style,
  delay = 3000,
  autohide = true,
}) {
  return (
    <ToastContainer className="p-3" position={"top-end"}>
      <Toast
        style={style}
        autohide={autohide}
        delay={delay}
        show={show}
        onClose={onClose}
      >
        <Toast.Body>{msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
