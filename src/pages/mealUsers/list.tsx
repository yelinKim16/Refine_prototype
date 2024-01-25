import React from "react";
import { useTranslate } from "@refinedev/core";
import { IMealUser } from "interfaces";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DateField,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
  DeleteButton,
} from "@refinedev/mui";
export const MealUsersList: React.FC = () => {
  const t = useTranslate(); // 다국어 지원
  const { dataGridProps } = useDataGrid<IMealUser>();
  const {
    paginationMode,
    paginationModel,
    onPaginationModelChange,
    ...restDataGridProps
  } = dataGridProps;

  const columns = React.useMemo<GridColDef<IMealUser>[]>(
    () => [
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
        width: 110,
      },
      {
        field: "departmentNm",
        headerName: "DepartmentNm",
        width: 120,
      },
      {
        field: "positionNm",
        headerName: "PositionNm",
        width: 100,
      },
      {
        field: "createDt",
        headerName: "CreateDt",
        width: 160,
        renderCell: function render({ value }) {
          return <DateField format="YYYY-MM-DD HH:mm:ss" value={value} />;
        },
      },
      {
        field: "modifyDt",
        headerName: "ModifyDt",
        width: 160,
        renderCell: function render({ value }) {
          return <DateField format="YYYY-MM-DD HH:mm:ss" value={value} />;
        },
      },

      {
        field: "actions",
        headerName: t(""),
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText size="small" recordItemId={row.id} />
              <ShowButton hideText size="small" recordItemId={row.id} />
              <DeleteButton hideText size="small" recordItemId={row.id} />
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
    <List>
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
