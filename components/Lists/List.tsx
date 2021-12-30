import { ListGroup } from "react-bootstrap";
import ListItem from "./ListItem";
import useModal from "../../hooks/useModal";
import React, { useState } from "react";

export default function List(props) {
  const { isShowing: isModalShowing, toggle: ModalToggle } = useModal();
  const [row, setRow] = useState({});
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
              onClick={(row) => {
                setRow(row);
                ModalToggle();
              }}
            />
          ))}
        </ListGroup>
      </div>
      <props.modal
        row={row}
        show={isModalShowing}
        handleClose={() => ModalToggle()}
        handleCloseAndRoll={() => {
          ModalToggle();
        }}
      />
    </>
  );
}
