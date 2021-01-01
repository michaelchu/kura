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
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#modal-edit-trans"
              >
                Edit
              </a>
            </td>
          </tr>
        );
      })}
  </tbody>
);

export default DataTableBody;
