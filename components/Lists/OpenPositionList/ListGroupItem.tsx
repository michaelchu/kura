import accounting from "accounting";
export default function ListGroupItem({
  symbol,
  trade_date,
  action,
  price,
  total_cost,
  fee,
}) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-6">
          <div className="text-body">{symbol}</div>
          <div className="text-muted">{trade_date}</div>
        </div>
        <div className="col-2">
          <div className="text-body">{price}</div>
          <div className="text-muted">{action}</div>
        </div>
        <div className="col-4">
          <div className={"text-body text-end"}>
            <span className={total_cost < 0 ? "text-success" : "text-danger"}>
              {total_cost < 0
                ? accounting.formatMoney(Math.abs(total_cost))
                : accounting.formatMoney(total_cost * -1)}
            </span>
            <div className="text-muted">{fee}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
