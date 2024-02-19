import React, { useCallback } from "react";
import {
  useMany,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import { List, useDataGrid } from "@refinedev/mui";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import { IEntryDoor, IWorkPlace } from "../../interfaces";

export const EntryDoor: React.FC<IResourceComponentsProps> = () => {
  const { dataGridProps } = useDataGrid<IWorkPlace>();
  const workPlaceIds = dataGridProps.rows.map((item) => item.id);

  const { data } = useMany<IWorkPlace>({
    resource: "workPlace",
    ids: workPlaceIds,
    queryOptions: {
      enabled: workPlaceIds.length > 0,
    },
  });

  const t = useTranslate();

  //최초 페이지
  const columns = React.useMemo<ColumnDef<IWorkPlace>[]>(
    () => [
      {
        id: "name",
        accessorKey: "name",
        headerName: t("workPlace.fields.name"),
        cell: function render({ row, getValue }) {
          return (
            <Stack direction="row" alignItems="center" spacing={3}>
              <IconButton onClick={() => row.toggleExpanded()}>
                {row.getIsExpanded() ? ( // 열고닫기
                  <RemoveCircleOutline fontSize="small" />
                ) : (
                  <AddCircleOutline fontSize="small" />
                )}
              </IconButton>
              <Typography>{getValue() as string}</Typography>
            </Stack>
          );
        },
      },
      {
        id: "category",
        accessorKey: "category",
        headerName: t("workPlace.fields.category"),
      },
      {
        id: "companyNm",
        accessorKey: "companyNm",
        headerName: t("workPlace.fields.companyNm"),
      },
      {
        id: "type",
        accessorKey: "type",
        headerName: t("workPlace.fields.type"),
      },
    ],
    [t]
  );

  //테이블 생성
  const {
    options: {
      // 페이징 상태 관리
      state: { pagination },
      pageCount,
    },
    getHeaderGroups, //헤더 그룹
    getRowModel, // 로우 모델
    setPageIndex,
    setPageSize,
    refineCore: { tableQueryResult },
  } = useTable<IWorkPlace>({
    columns,
    initialState: {
      sorting: [{ id: "title", desc: false }],
    },
  });

  //각 행에 대한 하위 컴포넌트 렌더링
  const renderRowSubComponent = useCallback(
    ({ row }: { row: Row<IWorkPlace> }) => (
      <CategoryProductsTable record={row.original} />
    ),
    []
  );

  return (
    <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            {getHeaderGroups().map(
              (
                headerGroup // 헤더 그룹 순회
              ) => (
                <TableRow key={`header-group-${headerGroup.id}`}>
                  {headerGroup.headers.map(
                    (
                      header // 그룹 안의 헤더 순회
                    ) => (
                      <TableCell key={`header-group-cell-${header.id}`}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableCell>
                    )
                  )}
                </TableRow>
              )
            )}
          </TableHead>

          <TableBody>
            {getRowModel().rows.map((row) => {
              return (
                <React.Fragment key={row.id}>
                  <TableRow>
                    {row.getAllCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {row.getIsExpanded() && ( // 확장되었을 때 실행
                    <TableRow>
                      <TableCell colSpan={row.getVisibleCells().length}>
                        {renderRowSubComponent({
                          row,
                        })}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[
          5,
          10,
          25,
          {
            label: "All",
            value: tableQueryResult.data?.total ?? 100,
          },
        ]}
        showFirstButton
        showLastButton
        count={pageCount || 0}
        rowsPerPage={pagination?.pageSize || 10}
        page={pagination?.pageIndex || 0}
        onPageChange={(_, newPage: number) => setPageIndex(newPage)}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPageSize(parseInt(event.target.value, 10));
          setPageIndex(0);
        }}
      />
    </List>
  );
};

// + 눌렀을때 페이지
const CategoryProductsTable: React.FC<{ record: IWorkPlace }> = ({
  record,
}) => {
  const t = useTranslate();

  const { dataGridProps } = useDataGrid<IEntryDoor>({
    resource: "entryDoor",
    initialPageSize: 5,
    // filters: {
    //   permanent: [
    //     {
    //       field: "workPlace.id",
    //       operator: "eq",
    //       value: record.id,
    //     },
    //   ],
    // },
    filters: {
      permanent: [
        {
          field: "field.id",
          operator: "eq",
          value: record.id,
        },
      ],
    },

    syncWithLocation: false,
  });

  // 하위 테이블 colums
  const columns = React.useMemo<GridColDef<IEntryDoor>[]>(
    () => [
      {
        field: "name",
        header: t("entryDoor.fields.name"),
        flex: 1,
        minWidth: 180,
      },
      {
        field: "workPlace",
        header: t("entryDoor.fields.workPlace"),
        renderCell: function render({ value }) {
          return value.name;
        },
        flex: 1,
        minWidth: 100,
      },
      {
        field: "category",
        header: t("entryDoor.fields.category"),
        flex: 1,
        minWidth: 180,
      },
      {
        field: "type",
        header: t("entryDoor.fields.type"),
        flex: 1,
        minWidth: 180,
      },
    ],
    [t]
  );

  return (
    <List
      headerProps={{
        title: t("출입문 구조"),
      }}
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        rowHeight={80}
        autoHeight
        density="comfortable"
        pageSizeOptions={[5, 10, 25, 50, 100]}
      />
    </List>
  );
};
