import React from "react";
import AccordionTable from "../Accordion/AccordionTable";

interface RowItem {
  account_id: string;
  action: string;
  asset_type: string;
  expiration: string;
  name: string;
  quantity: number;
  root: string;
  strategy: string;
  strike: string;
  total_cost: number;
  trade_date: string;
  type: string;
}

export default function Accordion({ title, cols, data }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
      </div>
      <div className="accordion" id="open-positions-accordion">
        {Object.entries(data).map(([key, value]: [string, RowItem[]], idx) => {
          return (
            <div key={idx} className="accordion-item">
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
                    className="badge badge bg-cyan-lt"
                    style={{ marginLeft: 5 }}
                  >
                    {value.length} {value.length == 1 ? "trade" : "trades"}
                  </span>
                </button>
              </h2>
              <div
                id={"collapse-" + idx}
                className={"accordion-collapse collapse show"}
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
