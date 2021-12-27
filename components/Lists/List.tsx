import { ListGroup } from "react-bootstrap";
import ListItem from "./ListItem";
import useModal from "../../hooks/useModal";
import React, { useState } from "react";

export default function List(props) {
  const { isShowing: isModalShowing, toggle: ModalToggle } = useModal();
  const [symbol, setSymbol] = useState("");
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{props.title}</h3>
        </div>
        <ListGroup variant={"flush"}>
          {props.data.map((row) => (
            <ListItem
              row={row}
              columns={props.columns}
              onClick={(symbol) => {
                setSymbol(symbol);
                ModalToggle();
              }}
            />
          ))}
        </ListGroup>
      </div>
      <props.modal
        symbol={symbol}
        show={isModalShowing}
        handleClose={() => ModalToggle()}
        handleCloseAndRoll={() => {
          ModalToggle();
        }}
      />
    </>
  );
}
