const DataTableFilter = ({ limit }) => (
  <div class="d-flex">
    <div class="text-muted">
      Show
      <div class="mx-2 d-inline-block">
        <input
          type="text"
          className="form-control form-control-sm"
          value="8"
          size="3"
          aria-label="Transactions count"
        />
      </div>
      entries
    </div>
    <div class="ms-auto text-muted">
      Search:
      <div class="ms-2 d-inline-block">
        <input
          type="text"
          className="form-control form-control-sm"
          aria-label="Search Transaction"
        />
      </div>
    </div>
  </div>
);

export default DataTableFilter;
