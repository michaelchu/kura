import ListGroupItem from "./ListGroupItem";
import { TransactionRowItem } from "../../../@types/interfaces";

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
        {Object.entries(data).map(
          ([heading, rows]: [string, TransactionRowItem[]]) => {
            return (
              <>
                <div className="list-group-header sticky-top">{heading}</div>
                {rows.map((row) => {
                  return (
                    <ListGroupItem
                      symbol={row.symbol}
                      action={row.action_name}
                      trade_date={row.trade_date}
                      strategy={row.strategy_name}
                      total_cost={row.total_cost}
                    />
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
