import _ from "lodash";
const render = (row, renderProps): JSX.Element => {
  if (!("accessor" in renderProps)) return <></>;
  const value = row[renderProps.accessor];

  if (!("Cell" in renderProps)) return <>{value}</>;
  return renderProps.Cell({ row, value });
};

export default function ListGroup(props) {
  const grouped_data = _.groupBy(props.data, props.groupFunc);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{props.title}</h3>
      </div>
      <div
        className="list-group list-group-flush overflow-auto"
        style={{ maxHeight: "35rem" }}
      >
        {Object.entries(grouped_data).map(
          ([heading, rows]: [string, any[]]) => {
            return (
              <>
                <div className="list-group-header sticky-top">{heading}</div>
                {rows.map((row) => {
                  return (
                    <>
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
                    </>
                  );
                })}
              </>
            );
          }
        )}
      </div>
    </div>
  );
}
