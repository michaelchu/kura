export default function MiniStatCardTimeSelect() {
  return (
    <div className="dropdown">
      <a
        className="dropdown-toggle text-muted"
        href="#"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Last 7 days
      </a>
      <div className="dropdown-menu dropdown-menu-end">
        <a className="dropdown-item active" href="#">
          Last 7 days
        </a>
        <a className="dropdown-item" href="#">
          Last 30 days
        </a>
        <a className="dropdown-item" href="#">
          Last 3 months
        </a>
      </div>
    </div>
  );
}
