import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import 'ag-grid-enterprise';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.css";

// enable sorting on all columns by default
const defaultColDef = {
  sortable: true,
  filter: 'agNumberColumnFilter'
};

const columnDefs: ColDef[] = [
  { field: "designation", filter: 'agTextColumnFilter', headerName: "Designation" },
  { field: "discovery_date",
    filter: 'agDateColumnFilter',
    headerName: "Discovery Date",
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return formattedDate;
    },
  },
  { field: "h_mag", headerName: "H (mag)" },
  { field: "moid_au", headerName: "MOID (au)" },
  { field: "q_au_1", headerName: "q (au)" },
  { field: "q_au_2", headerName: "Q (au)" },
  { field: "period_yr", headerName: "Period (yr)" },
  { field: "i_deg", headerName: "Inclination (deg)" },
  { field: "pha",
    filter: 'agTextColumnFilter',
    headerName: "Potentially Hazardous",
    valueFormatter: (params) => {
      return params.value === 'Y'
        ? 'Yes'
        : params.value === 'N'
        ? 'No'
        : params.value === 'n/a'
        ? ''
        : params.value;
    },
  },
  { field: "orbit_class", filter: 'agTextColumnFilter', headerName: "Orbit Class", enableRowGroup: true, },
];

const NeoGrid = (): JSX.Element => {
  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <h1 className="title">Near-Earth Object Overview</h1>
      <AgGridReact
        rowData={data}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowGroupPanelShow={'always'}
        enableRangeSelection={true}
      />
    </div>
  );
};

export default NeoGrid;
