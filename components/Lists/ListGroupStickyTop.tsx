export default function ListGroupStickyTop({ title, data }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div
        className="list-group list-group-flush overflow-auto"
        style={{ maxHeight: "35rem" }}
      >
        <div className="list-group-header sticky-top">Dec 2021</div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Eva Acres
              </a>
              <div className="text-muted text-truncate mt-n1">
                Change deprecated html tags to text decoration classes (#29604)
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Sunny Airey
              </a>
              <div className="text-muted text-truncate mt-n1">
                justify-content:between ⇒ justify-content:space-between (#29734)
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Northrop Alforde
              </a>
              <div className="text-muted text-truncate mt-n1">
                Update change-version.js (#29736)
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Virgil Archbutt
              </a>
              <div className="text-muted text-truncate mt-n1">
                Regenerate package-lock.json (#29730)
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Guthry Arlott
              </a>
              <div className="text-muted text-truncate mt-n1">
                Some minor text tweaks
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-header sticky-top">Nov 2021</div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Cary Baleine
              </a>
              <div className="text-muted text-truncate mt-n1">
                Set vertical-align on .form-check-input (#29521)
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Borden Barkworth
              </a>
              <div className="text-muted text-truncate mt-n1">
                Keep themed appearance for print (#29714)
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Regan Baser
              </a>
              <div className="text-muted text-truncate mt-n1">
                Use double quotes in `.stylelintrc` (#29709)
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Leesa Beaty
              </a>
              <div className="text-muted text-truncate mt-n1">
                Regenerate package-lock.json (#29695)
              </div>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="row">
            <div className="col text-truncate">
              <a href="#" className="text-body d-block">
                Guendolen Belliss
              </a>
              <div className="text-muted text-truncate mt-n1">
                Switch to the Coveralls Action (#29478)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
