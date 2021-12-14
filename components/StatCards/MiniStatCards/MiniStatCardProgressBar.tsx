import { IconTrendingDown, IconTrendingUp } from "@tabler/icons";

export default function MiniStatCardProgressBar({
  progressBarTitle,
  pctHeading,
}) {
  return (
    <>
      <div className="d-flex mb-2">
        <div>{progressBarTitle}</div>
        <div className="ms-auto">
          <span
            className={
              pctHeading > 0
                ? "text-green "
                : "text-red " + "d-inline-flex align-items-center lh-1"
            }
          >
            {pctHeading}%
            {pctHeading > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
          </span>
        </div>
      </div>
      <div className="progress progress-sm">
        <div
          className="progress-bar bg-blue"
          style={{ width: "75%" }}
          role="progressbar"
          aria-valuenow={75}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </>
  );
}
