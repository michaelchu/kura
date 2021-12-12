import React from "react";
import AccordionTable from "../Accordion/AccordionTable";

export default function Accordion({ cols, data }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Open Positions</h2>
      </div>
      <div className="accordion" id="open-positions-accordion">
        {Object.entries(data).map(([key, value], idx) => {
          return (
            <div className="accordion-item">
              <h2 className="accordion-header" id={"heading-" + idx}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#collapse-" + idx}
                  aria-expanded="true"
                >
                  {key}
                  <span
                    className="badge badge bg-green-lt"
                    style={{ marginLeft: 5 }}
                  >
                    {" "}
                    {value.length} trades
                  </span>
                </button>
              </h2>
              <div
                id={"collapse-" + idx}
                className={
                  idx == 0
                    ? "accordion-collapse collapse show"
                    : "accordion-collapse collapse"
                }
                data-bs-parent="#open-positions-accordion"
              >
                <div className="accordion-body">
                  <AccordionTable cols={cols} data={value} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
