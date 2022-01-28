import React from "react";

export default function Accordion(props) {
  return (
    <div className="card">
      <div className="accordion" id="open-positions-accordion">
        {Object.entries(props.data).map(
          ([key, value]: [string, any[]], idx) => {
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
                  className={
                    "accordion-collapse collapse " + (idx == 0 ? "show" : "")
                  }
                  data-bs-parent="#open-positions-accordion"
                >
                  <div className="accordion-body">
                    <props.subComponent.component
                      data={value}
                      subProps={props.subComponent.subProps}
                    />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
