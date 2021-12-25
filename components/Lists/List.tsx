const render = (row, renderProps): JSX.Element => {
  const value = row[renderProps.accessor];
  return "Cell" in renderProps ? (
    renderProps.Cell({ row, value })
  ) : (
    <>{value}</>
  );
};

export default function List(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{props.title}</h3>
      </div>
      <div
        className="list-group list-group-flush overflow-auto"
        style={{ maxHeight: "35rem" }}
      >
        {props.data.map((row) => {
          return (
            <div className="list-group-item">
              <div className="row">
                {props.columns.map((col, index) => {
                  return (
                    <div className={col.width ? col.width : "col-4"}>
                      <div
                        className={
                          props.columns[index + 1]
                            ? "text-body"
                            : "text-body text-end"
                        }
                      >
                        {render(row, col["top"])}
                      </div>
                      <div
                        className={
                          props.columns[index + 1]
                            ? "text-muted"
                            : "text-muted text-end"
                        }
                      >
                        {render(row, col["bottom"])}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
