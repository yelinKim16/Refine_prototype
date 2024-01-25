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
import { ReactNode } from "react";
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
          // helperText={errors.empNo?.message as ReactNode}
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
          error={!!errors.price}
          // helperText={errors.price?.message as ReactNode}
          margin="normal"
          fullWidth
          label="EmpNm"
          name="empNm"
        />
        <TextField
          id="companyNm"
          {...register("companyNm", {
            required: "This field is required",
          })}
          error={!!errors.empNo}
          // helperText={errors.empNo?.message as ReactNode}
          margin="normal"
          fullWidth
          label="CompanyNm"
          name="companyNm"
        />
        <TextField
          id="companyNm"
          {...register("companyNm", {
            required: "This field is required",
          })}
          error={!!errors.empNo}
          // helperText={errors.empNo?.message as ReactNode}
          margin="normal"
          fullWidth
          label="CompanyNm"
          name="companyNm"
        />
        <TextField
          id="positionNm"
          {...register("positionNm", {
            required: "This field is required",
          })}
          error={!!errors.empNo}
          // helperText={errors.empNo?.message as ReactNode}
          margin="normal"
          fullWidth
          label="PositionNm"
          name="positionNm"
        />

        <TextField
          id="description"
          {...register("description", {
            required: "This field is required",
          })}
          error={!!errors.description}
          // helperText={errors.description?.message as ReactNode}
          margin="normal"
          fullWidth
          label="Description"
          name="description"
        />
      </Box>
    </Create>
  );
};
