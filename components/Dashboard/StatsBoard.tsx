import StatCard from "./StatCards/StatCard";
import accounting from "accounting";
import React from "react";

export default function StatsBoard({
  total_pnl,
  win_rate,
  avg_pnl,
  total_fees,
}) {
  return (
    <>
      <div className="col-6 col-sm-3 col-lg-3">
        <StatCard
          title={"Total Realized P/L"}
          value={accounting.formatMoney(total_pnl)}
          pct_chg={2.65}
        />
      </div>
      <div className="col-6 col-sm-3 col-lg-3">
        <StatCard title={"Win Rate"} value={win_rate + "%"} pct_chg={3.5} />
      </div>
      <div className="col-6 col-sm-3 col-lg-3">
        <StatCard
          title={"Average P/L"}
          value={accounting.formatMoney(avg_pnl)}
          pct_chg={1.59}
        />
      </div>
      <div className="col-6 col-sm-3 col-lg-3">
        <StatCard
          title={"Total Commissions"}
          value={accounting.formatMoney(total_fees)}
          pct_chg={2}
        />
      </div>
    </>
  );
}
