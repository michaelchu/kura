import { IconTrendingDown, IconTrendingUp } from "@tabler/icons";

export default function MiniCenteredStatCard({ title, value, pct_chg }) {
  return (
    <div className="card">
      <div className="card-body p-2 text-center">
        <div className="text-end text-green">
          <span
            className={
              pct_chg > 0
                ? "text-green "
                : "text-red " + "d-inline-flex align-items-center lh-1"
            }
          >
            {pct_chg}%{pct_chg > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
          </span>
        </div>
        <div className="h1 m-0">{value}</div>
        <div className="text-muted mb-3">{title}</div>
      </div>
    </div>
  );
}
