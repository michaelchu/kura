import DataTableBody from "./DataTableBody";
import DataTableHeader from "./DataTableHeader";
import DataTableFooter from "./DataTableFooter";

const DataTable = ({ data, title, headers }) => (
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{title}</h3>
    </div>
    <div class="card-body border-bottom py-3">
      <div class="d-flex">
        <div class="text-muted">
          Show
          <div class="mx-2 d-inline-block">
            <input
              type="text"
              className="form-control form-control-sm"
              value="8"
              size="3"
              aria-label="Invoices count"
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
              aria-label="Search invoice"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table card-table table-vcenter text-nowrap datatable">
        <DataTableHeader headers={headers} />
        <DataTableBody data={data} headers={headers} />
      </table>
    </div>
    <DataTableFooter data={data} />
  </div>
);

export default DataTable;
