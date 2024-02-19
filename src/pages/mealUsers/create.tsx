// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

// export const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {
//   return <MuiCreateInferencer />;
// };
import { useForm } from "@refinedev/react-hook-form";
import { Create } from "@refinedev/mui";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { IMealUser } from "interfaces";

export const MealUsersCreate: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult, autoSaveProps },
    register,
    control,
    formState: { errors },
  } = useForm<IMealUser>();

  return (
    <Create saveButtonProps={saveButtonProps}>
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
          error={!!errors.empNo}
          margin="normal"
          fullWidth
          label="EmpNo"
          name="empNo"
        />
        <TextField
          id="empNm"
          {...register("empNm", {
            required: "This field is required",
          })}
          error={!!errors.empNm}
          margin="normal"
          fullWidth
          label="EmpNm"
          name="empNm"
        />
        <TextField
          id="empType"
          {...register("empType", {
            required: "This field is required",
          })}
          error={!!errors.empType}
          margin="normal"
          fullWidth
          label="EmpType"
          name="empType"
        />
        <TextField
          id="companyNm"
          {...register("companyNm", {
            required: "This field is required",
          })}
          error={!!errors.companyNm}
          margin="normal"
          fullWidth
          label="CompanyNm"
          name="companyNm"
        />
        <TextField
          id="departmentNm"
          {...register("departmentNm", {
            required: "This field is required",
          })}
          error={!!errors.departmentNm}
          margin="normal"
          fullWidth
          label="DepartmentNm"
          name="departmentNm"
        />
        <TextField
          id="positionNm"
          {...register("positionNm", {
            required: "This field is required",
          })}
          error={!!errors.positionNm}
          margin="normal"
          fullWidth
          label="PositionNm"
          name="positionNm"
        />
      </Box>
    </Create>
  );
};
