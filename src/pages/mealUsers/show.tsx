import { Show } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "@refinedev/react-hook-form";
import { useShow } from "@refinedev/core";
import { IMealUser } from "interfaces";

export const MealUsersShow: React.FC = () => {
  const { queryResult } = useShow<IMealUser>();
  const { isLoading } = queryResult;
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <Show isLoading={isLoading}>
      <Box
        component="section"
        sx={{ display: "flex", flexDirection: "column" }}
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
          disabled={true}
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
          disabled={true}
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
          disabled={true}
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
          disabled={true}
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
          disabled={true}
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
          disabled={true}
        />
        <TextField
          id="createDt"
          {...register("createDt", {
            required: "This field is required",
          })}
          error={!!errors.price}
          margin="normal"
          fullWidth
          label="CreateDt"
          name="createDt"
          disabled={true}
        />
        <TextField
          id="modifyDt"
          {...register("modifyDt", {
            required: "This field is required",
          })}
          error={!!errors.price}
          margin="normal"
          fullWidth
          label="ModifyDt"
          name="modifyDt"
          disabled={true}
        />
      </Box>
    </Show>
  );
};
