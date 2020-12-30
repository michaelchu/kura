const humanizeString = require("humanize-string");

const DataTableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {Object.entries(headers).map(([_, value]) => (
          <th>{value.label}</th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};

export default DataTableHeader;
