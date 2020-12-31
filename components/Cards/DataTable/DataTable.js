import DataTableBody from "./DataTableBody";
import DataTableHeader from "./DataTableHeader";
import DataTableFooter from "./DataTableFooter";
import DataTableFilter from "./DataTableFilter";

const DataTable = ({ data, title, headers }) => (
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{title}</h3>
    </div>
    {/* <div class="card-body border-bottom py-3">
      <DataTableFilter />
    </div> */}
    <div class="table-responsive">
      <table class="table card-table table-vcenter text-nowrap datatable">
        <DataTableHeader headers={headers} />
        <DataTableBody data={data} headers={headers} />
      </table>
    </div>
    {/* <div>
      <DataTableFooter data={data} />
    </div> */}
  </div>
);

export default DataTable;
