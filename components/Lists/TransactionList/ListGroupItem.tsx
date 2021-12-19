import accounting from "accounting";
export default function ListGroupItem({
  symbol,
  action,
  trade_date,
  strategy,
  total_cost,
}) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-5">
          <div className="text-body">{symbol}</div>
          <div className="text-muted">{trade_date}</div>
        </div>
        <div className="col-3">{strategy}</div>
        <div className="col-4">
          <div className={"text-body text-end"}>
            {accounting.formatMoney(Math.abs(total_cost))}
          </div>
          <div className="text-muted text-end">
            {(() => {
              if (action == "Buy to Open" || action == "Buy to Close") {
                return <span className="badge bg-green-lt">{action}</span>;
              } else if (
                action == "Sell to Close" ||
                action == "Sell to Open"
              ) {
                return <span className="badge bg-pink-lt">{action}</span>;
              } else {
                return <span className="badge bg-yellow-lt">{action}</span>;
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
