import React, { ComponentProps } from "react";
import {
  CrudFilters,
  HttpError,
  getDefaultFilter,
  useTranslate,
} from "@refinedev/core";
import {
  IDepartment,
  IMealUser,
  IMealUserFilterVariables,
  Nullable,
} from "interfaces";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { Controller } from "react-hook-form";
import { Box } from "@mui/system";
import {
  EditButton,
  List,
  ShowButton,
  useDataGrid,
  DeleteButton,
  TagField,
} from "@refinedev/mui";
import {
  Autocomplete,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { SearchOutlined } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";

export const MealUsersList: React.FC = () => {
  const t = useTranslate(); // 다국어 지원

  const { dataGridProps, filters, search } = useDataGrid<
    IMealUser,
    HttpError,
    Nullable<IMealUserFilterVariables>
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, departmentNm } = params;

      filters.push(
        {
          field: "q",
          operator: "eq",
          value: q,
        },
        {
          field: "departmentNm",
          operator: "eq",
          value: departmentNm ? departmentNm : undefined,
        }
      );
      return filters;
    },
  });

  const { paginationMode, paginationModel, onPaginationModelChange } =
    dataGridProps;

  const columns = React.useMemo<GridColDef<IMealUser>[]>(
    () => [
      {
        field: "empNm",
        headerName: t("mealUsers.fields.empNm"),
        width: 140,
        renderCell: function render({ row }) {
          return (
            <Stack alignItems="center" direction="row" spacing={2}>
              <Avatar alt={`${row.empNm}`} src={row.avatar?.[0]?.url} />
              <Typography variant="body2">{row.empNm}</Typography>
            </Stack>
          );
        },
      },
      {
        field: "empNo",
        headerName: t("mealUsers.fields.empNo"),
        minWidth: 100,
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
        width: 100,
      },
      {
        field: "departmentNm",
        headerName: t("mealUsers.fields.departmentNm"),
        width: 100,
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
        width: 150,
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

  //검색 Filter
  const { control, register, handleSubmit } = useForm<
    IMealUser,
    HttpError,
    Nullable<IMealUserFilterVariables>
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
              <TextField
                {...register("q")}
                id="q"
                label="Search"
                placeholder="Id, Name, Company, etc."
                margin="normal"
                sx={{ mr: 2 }}
                autoFocus
                size="small"
                InputProps={{
                  // iCon
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlined />
                    </InputAdornment>
                  ),
                }}
              />

              <Controller
                control={control}
                name="departmentNm"
                render={({ field }) => (
                  <Autocomplete<IDepartment>
                    id="departmentNm"
                    options={["개발부", "영업부", "인사부"]}
                    {...field}
                    onChange={(_, value) => {
                      field.onChange(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Department"
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
                {t("buttons.search")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={12}>
        <List>
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
