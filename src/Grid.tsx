import { useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import data from "./near-earth-asteroids.json";
import { defaultColDef, columnDefs } from "./Constants";
import 'ag-grid-enterprise';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style.css";

const NeoGrid = (): JSX.Element => {
  const gridRef = useRef<AgGridReact>(null);

  const clearSort = useCallback(() => {
    gridRef.current?.columnApi?.applyColumnState({
      defaultState: { sort: null },
    });
  }, []);

  const clearFilters = useCallback(() => {
    gridRef.current?.api.setFilterModel(null);
  }, []);

  const clearSortAndFilters = () => {
    clearSort();
    clearFilters();
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <div className="head">
        <h1 className="title">Near-Earth Object Overview</h1>
        <button onClick={clearSortAndFilters}>Clear Filters and Sorters</button>
      </div>
      
      <AgGridReact
        ref={gridRef}
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
