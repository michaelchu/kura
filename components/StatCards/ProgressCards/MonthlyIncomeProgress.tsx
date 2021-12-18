import _ from "lodash";

export default function MonthlyIncomeProgress(props) {
  const grouped_rows = _.groupBy(props.data, (row) => row.root);
  // Add sensible amounts of shades or create shades with procedural algorithm
  const progress_shades = ["bg-primary", "bg-info", "bg-success"];
  return (
    <div className="list-group list-group-flush list-group-hoverable">
      {Object.entries(grouped_rows).map(([symbol, strategies]) => {
        const total = strategies.reduce(
          (acc, curr) => acc + curr.current * -1,
          0
        );
        let goal = _.first(strategies).goal;
        return (
          <div className="list-group-item">
            <p className="mb-3">
              <strong>{symbol}</strong> Progress - <strong>${total}</strong> of
              ${goal}
            </p>
            <div className="progress progress-separated mb-3">
              {strategies.map((strategy, idx) => {
                const ratio = ((strategy.current * -1) / strategy.goal) * 100;
                return (
                  <div
                    className={"progress-bar " + progress_shades[idx]}
                    role="progressbar"
                    style={{ width: ratio + "%" }}
                  />
                );
              })}
            </div>
            <div className="row">
              {strategies.map((strategy, idx) => {
                return (
                  <>
                    <div className="col-auto d-flex align-items-center pe-2">
                      <span className={"legend me-2 " + progress_shades[idx]} />
                      <span>{strategy.strategy}</span>
                      <span className="d-none d-md-inline d-lg-none d-xxl-inline ms-2 text-muted">
                        ${strategy.current * -1}
                      </span>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
