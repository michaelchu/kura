import MiniStatCardTimeSelect from "./MiniStatCardTimeSelect";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons";

export default function MiniStatCardWithChart({
  title,
  value,
  pctChange,
  chartId,
}) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className="subheader">{title}</div>
          <div className="ms-auto lh-1">
            <MiniStatCardTimeSelect />
          </div>
        </div>
        <div className="d-flex align-items-baseline">
          <div className="h1 mb-0 me-2">{value}</div>
          <div className="me-auto">
            <span className="text-green d-inline-flex align-items-center lh-1">
              {pctChange}%
              {pctChange > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
            </span>
          </div>
        </div>
      </div>
      <div id={chartId} className="chart-sm" />
    </div>
  );
}
