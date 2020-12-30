const accounting = require("accounting");

const DataTableBody = ({ data, headers }) => (
  <tbody>
    {data &&
      data.map((row) => {
        row = flattenObject(row);
        return (
          <tr>
            {Object.entries(headers).map(([key, value]) => (
              <td>
                {value.format ? accounting.formatMoney(row[key]) : row[key]}
              </td>
            ))}
            <td class="text-end">
              <span class="dropdown">
                <button
                  class="btn dropdown-toggle align-text-top"
                  data-bs-boundary="viewport"
                  data-bs-toggle="dropdown"
                >
                  Actions
                </button>
                <div class="dropdown-menu dropdown-menu-end">
                  <a class="dropdown-item" href="#">
                    Edit
                  </a>
                  <a class="dropdown-item" href="#">
                    Delete
                  </a>
                </div>
              </span>
            </td>
          </tr>
        );
      })}
  </tbody>
);

export const flattenObject = (obj) => {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  });

  return flattened;
};

export default DataTableBody;
