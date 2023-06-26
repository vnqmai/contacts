import BSTable from "react-bootstrap/Table";

function Table(props) {
  const { fields, items, itemClassName, onItemClick } = props;

  return (
    <BSTable responsive="sm" striped bordered hover>
      <thead>
        <tr>
          {fields.map((field) => (
            <th key={`th-${field.name}`} className={`td-${field.className}`}>
              {field.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          items?.length > 0 ?
          items.map((item) => (
            <tr
              key={`tr-${item.id}`}
              className={itemClassName}
              onClick={() => onItemClick(item.id)}
            >
              {fields.map((field) => (
                <td key={`td-${field.name}`} className={`td-${field.className}`}>
                  {item[field.name]}
                </td>
              ))}
            </tr>
          )) :
          <tr>
            <td colSpan={fields.length} className="no-results">No results</td>
          </tr>
        }
      </tbody>
    </BSTable>
  );
}

export default Table;
