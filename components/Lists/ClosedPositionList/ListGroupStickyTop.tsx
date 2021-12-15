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
                    account={row.name}
                    trade_date={row.exit_date}
                    strategy={row.strategy}
                    realized_pnl={row.realized_pnl}
                    fee={row.total_fees}
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
