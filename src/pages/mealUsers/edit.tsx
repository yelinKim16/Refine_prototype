import { Edit } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "@refinedev/react-hook-form";

import { IMealUser } from "interfaces";
import { useDataGrid } from "@refinedev/mui";

export const MealUsersEdit: React.FC = () => {
  const { dataGridProps } = useDataGrid<IMealUser>();
  const {
    saveButtonProps,
    refineCore: { queryResult, autoSaveProps },
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          id="empNo"
          {...register("empNo", {
            required: "This field is required",
          })}
          error={!!errors.name}
          margin="normal"
          fullWidth
          label="EmpNo"
          name="empNo"
          autoFocus
        />
        <TextField
          id="empNm"
          {...register("empNm", {
            required: "This field is required",
          })}
          error={!!errors.material}
          margin="normal"
          fullWidth
          label="EmpNm"
          name="empNm"
          autoFocus
        />
        <TextField
          id="empType"
          {...register("empType", {
            required: "This field is required",
          })}
          error={!!errors.description}
          margin="normal"
          label="EmpType"
          name="empType"
          multiline
        />
        <TextField
          id="companyNm"
          {...register("companyNm", {
            required: "This field is required",
          })}
          error={!!errors.price}
          margin="normal"
          fullWidth
          label="CompanyNm"
          name="companyNm"
          autoFocus
        />
        <TextField
          id="departmentNm"
          {...register("departmentNm", {
            required: "This field is required",
          })}
          error={!!errors.description}
          margin="normal"
          label="DepartmentNm"
          name="departmentNm"
          multiline
        />
        <TextField
          id="positionNm"
          {...register("positionNm", {
            required: "This field is required",
          })}
          error={!!errors.price}
          margin="normal"
          fullWidth
          label="PositionNm"
          name="positionNm"
          autoFocus
        />
      </Box>
    </Edit>
  );
};
