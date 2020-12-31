const accounting = require("accounting");

const DataTableBody = ({ data, headers }) => (
  <tbody>
    {data &&
      data.map((row) => {
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
                  <a
                    href="#"
                    class="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#modal-edit-trans"
                  >
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

export default DataTableBody;
