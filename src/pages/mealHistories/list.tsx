import React from "react";
import { useTranslate, useExport } from "@refinedev/core";
import { IMealHistory } from "interfaces";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DateField,
  List,
  ShowButton,
  useDataGrid,
  ExportButton,
} from "@refinedev/mui";
export const MealHistoryList: React.FC = () => {
  const t = useTranslate(); // 다국어 지원
  const { dataGridProps } = useDataGrid<IMealHistory>();
  const { triggerExport, isLoading: exportLoading } = useExport<IMealHistory>();
  const { paginationMode, paginationModel, onPaginationModelChange } =
    dataGridProps;

  const columns = React.useMemo<GridColDef<IMealHistory>[]>(
    () => [
      {
        field: "mealDt",
        headerName: "MealDt",
        width: 180,
        renderCell: function render({ value }) {
          return <DateField format="YYYY-MM-DD HH:mm:ss" value={value} />;
        },
      },
      {
        field: "empNo",
        headerName: "EmpNo",
        minWidth: 100,
      },
      {
        field: "empNm",
        headerName: "EmpNm",
        width: 100,
      },
      {
        field: "empType",
        headerName: "EmpType",
        width: 100,
      },
      {
        field: "companyNm",
        headerName: "CompanyNm",
        width: 120,
      },
      {
        field: "departmentNm",
        headerName: "DepartmentNm",
        width: 120,
      },
      {
        field: "positionNm",
        headerName: "PositionNm",
        width: 120,
      },
      {
        field: "mealType",
        headerName: "MealType",
        width: 100,
      },

      {
        field: "actions",
        headerName: t("Show"),
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText size="small" recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [t]
  );

  return (
    <List
      headerButtons={
        <ExportButton onClick={triggerExport} loading={exportLoading} />
      }
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        paginationMode={paginationMode}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        autoHeight
      />
    </List>
  );
};
