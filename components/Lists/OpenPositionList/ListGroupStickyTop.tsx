import ListGroupItem from "./ListGroupItem";

export default function ListGroupStickyTop({ title, data }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div
        className="list-group list-group-flush overflow-auto"
        style={{ maxHeight: "35rem" }}
      >
        {Object.entries(data).map(([heading, rows]: [string, any[]]) => {
          return (
            <>
              <div className="list-group-header sticky-top">{heading}</div>
              {rows.map((row) => {
                return (
                  <ListGroupItem
                    symbol={row.symbol}
                    trade_date={row.trade_date}
                    action={row.action}
                    price={row.price}
                    total_cost={row.total_cost}
                    fee={row.fee}
                  />
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}
