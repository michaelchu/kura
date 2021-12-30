import { ListGroup } from "react-bootstrap";

export default function ListItem(props) {
  const render = (row, renderProps): JSX.Element => {
    if (!("accessor" in renderProps)) return <></>;
    const value = row[renderProps.accessor];

    if (!("Cell" in renderProps)) return <>{value}</>;
    return renderProps.Cell({ row, value });
  };
  return (
    <ListGroup.Item
      className={"list-group-item"}
      onClick={() => {
        props.onClick(props.row);
      }}
    >
      <div className="row">
        {props.columns.map((col, index) => {
          return (
            <div className={col.width ? col.width : "col"}>
              <div
                className={
                  "text-body" + (props.columns[index + 1] ? "" : " text-end")
                }
              >
                {render(props.row, col["top"])}
              </div>
              <div
                className={
                  "text-muted" + (props.columns[index + 1] ? "" : " text-end")
                }
              >
                {render(props.row, col["bottom"])}
              </div>
            </div>
          );
        })}
      </div>
    </ListGroup.Item>
  );
}
