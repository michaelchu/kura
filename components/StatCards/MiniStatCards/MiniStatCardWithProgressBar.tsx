import MiniStatCardTimeSelect from "./MiniStatCardTimeSelect";
import MiniStatCardProgressBar from "./MiniStatCardProgressBar";

export default function MiniStatCardWithProgressBar({
  title,
  value,
  progressBarTitle,
  pctHeading,
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
        <div className="h1 mb-3">{value}</div>
        <MiniStatCardProgressBar
          progressBarTitle={progressBarTitle}
          pctHeading={pctHeading}
        />
      </div>
    </div>
  );
}
