import React from "react";

import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";

export default function AdminTable(props) {
  const { data } = props;

  const columns = Object.keys(data[0]).map((k) => {
    return { key: k, name: k.toLocaleUpperCase() };
  });

  const rows = data;
  return <DataGrid columns={columns} rows={rows} />;
}
