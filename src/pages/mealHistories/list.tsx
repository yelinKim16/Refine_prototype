import React, { ComponentProps } from "react";
import { Controller } from "react-hook-form";
import { HttpError } from "interfaces/errors/HttpError";
import { useForm } from "@refinedev/react-hook-form";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import {
  useExport,
  useMany,
  CrudFilters,
  getDefaultFilter,
} from "@refinedev/core";
import {
  DateField,
  List,
  ShowButton,
  useDataGrid,
  ExportButton,
  TagField,
} from "@refinedev/mui";
import {
  Autocomplete,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import {
  IMealHistory,
  IDepartment,
  IMealHistoryFilterVariables,
  Nullable,
} from "interfaces";

export const MealHistoryList: React.FC = () => {
  //const t = useTranslate(); // 다국어 지원
  const { dataGridProps, filters, search } = useDataGrid<
    IMealHistory,
    HttpError,
    Nullable<IMealHistoryFilterVariables>
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { departmentNm } = params;

      filters.push({
        field: "departmentNm",
        operator: "eq",
        value: departmentNm ? departmentNm : undefined,
      });
      return filters;
    },
  });

  //리스트 출력
  const mealHistoryIds = dataGridProps.rows.map((item) => item.id);

  const { data: mealHistoriesData, isLoading } = useMany<IMealHistory>({
    resource: "mealHistories",
    ids: mealHistoryIds,
    queryOptions: {
      enabled: mealHistoryIds.length > 0,
    },
  });

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
        headerName: "Show",
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
    [mealHistoriesData, isLoading]
  );
  //검색기능
  const { control, handleSubmit } = useForm<
    IMealHistory,
    HttpError,
    Nullable<IMealHistoryFilterVariables>
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
      category: getDefaultFilter("status", filters, "eq"),
      departmentNm: getDefaultFilter("departmentNm", filters, "eq"),
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
          <CardContent sx={{ pt: 0 }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                alignItems: "center;",
              }}
              autoComplete="off"
              onSubmit={handleSubmit(search)}
            >
              <Controller
                control={control}
                name="departmentNm"
                render={({ field }) => (
                  <Autocomplete<IDepartment>
                    id="departmentNm"
                    options={["development", "sales", "humanResource"]}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="DepartmentNm"
                        placeholder="Post departmentNm"
                        margin="normal"
                        size="small"
                        style={{ width: "140px" }}
                      />
                    )}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ height: 38, width: 90, ml: 1, mt: 1 }}
              >
                Search
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={12}>
        <List
          headerButtons={
            <ExportButton onClick={triggerExport} loading={exportLoading} />
          }
        >
          <DataGrid
            {...dataGridProps}
            columns={columns}
            disableColumnFilter={true}
            filterModel={undefined}
            paginationMode={paginationMode}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
            autoHeight
          />
        </List>
      </Grid>
    </Grid>
  );
};
