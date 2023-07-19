import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";

export default function AdminTable(props) {
  const { data } = props;

  const columns = Object.keys(data[0]).map((k) => {
    return { field: k, headerName: k.toLocaleUpperCase(), sortable: true };
  });

  const rows = data;
  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <AgGridReact columnDefs={columns} rowData={rows}></AgGridReact>
    </div>
  );
}
