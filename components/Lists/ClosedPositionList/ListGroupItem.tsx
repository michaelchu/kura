import accounting from "accounting";
export default function ListGroupItem({
  symbol,
  account,
  trade_date,
  strategy,
  realized_pnl,
  fee,
}) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-5">
          <div className="text-body">{symbol}</div>
          <div className="text-muted">{strategy}</div>
        </div>
        <div className="col-4">
          <div className="text-body">{trade_date}</div>
          <div className="text-muted">{account}</div>
        </div>
        <div className="col-3">
          <div className={"text-body text-end"}>
            <span className={realized_pnl < 0 ? "text-success" : "text-danger"}>
              {realized_pnl < 0
                ? accounting.formatMoney(Math.abs(realized_pnl))
                : accounting.formatMoney(realized_pnl * -1)}
            </span>
          </div>
          <div className="text-muted text-end">{fee}</div>
        </div>
      </div>
    </div>
  );
}
