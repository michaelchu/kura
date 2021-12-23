import accounting from "accounting";
export default function ListGroupItem(props) {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-5">
          <div className="text-body">{props.symbol}</div>
          <div className="text-muted">{props.account}</div>
        </div>
        <div className="col-3">
          <div className="text-body">${props.avg_price}</div>
          <div className="text-muted">{props.quantity} Qty</div>
        </div>
        <div className="col-4">
          <div className={"text-body text-end"}>
            {accounting.formatMoney(props.book_cost)}
          </div>
          <div className="text-muted text-end">
            <a href={props.root + "/" + props.strategy}>{props.strategy_name}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
