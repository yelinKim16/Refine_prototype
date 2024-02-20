import React, { ComponentProps } from "react";
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
  TagField,
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
        headerName: t("mealUsers.fields.empNo"),
        minWidth: 100,
      },
      {
        field: "empNm",
        headerName: t("mealUsers.fields.empNm"),
        width: 100,
      },
      {
        field: "empType",
        headerName: t("mealUsers.fields.empType"),
        width: 100,
        renderCell: function render({ row }) {
          let color: ComponentProps<typeof TagField>["color"];
          switch (row.empType) {
            case "임직원":
              color = "success";
              break;
            case "방문자":
              color = "info";
              break;
          }
          return <TagField value={row.empType} color={color} />;
        },
      },
      {
        field: "companyNm",
        headerName: t("mealUsers.fields.companyNm"),
        width: 110,
      },
      {
        field: "departmentNm",
        headerName: t("mealUsers.fields.departmentNm"),
        width: 120,
      },
      {
        field: "positionNm",
        headerName: t("mealUsers.fields.positionNm"),
        width: 100,
      },
      {
        field: "createDt",
        headerName: t("mealUsers.fields.createDt"),
        width: 160,
        // renderCell: function render({ value }) {
        //   return <DateField format="YYYY-MM-DD HH:mm:ss" value={value} />;
        // },
      },
      {
        field: "modifyDt",
        headerName: t("mealUsers.fields.modifyDt"),
        width: 160,
        // renderCell: function render({ value }) {
        //   return <DateField format="YYYY-MM-DD HH:mm:ss" value={value} />;
        // },
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
