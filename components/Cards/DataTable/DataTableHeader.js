const humanizeString = require("humanize-string");

const DataTableHeader = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((heading) => (
          <th>{humanizeString(heading)}</th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
};

export default DataTableHeader;
