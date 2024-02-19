import { Edit } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "@refinedev/react-hook-form";

import { IMealUser } from "interfaces";
import { useDataGrid } from "@refinedev/mui";
import { useTranslate } from "@refinedev/core";

export const MealUsersEdit: React.FC = () => {
  const t = useTranslate();
  const {
    saveButtonProps,
    refineCore: { queryResult, autoSaveProps },
    register,
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
          label={t("mealUsers.fields.empNo")}
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
          label={t("mealUsers.fields.empNm")}
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
          label={t("mealUsers.fields.empType")}
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
          label={t("mealUsers.fields.companyNm")}
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
          label={t("mealUsers.fields.departmentNm")}
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
          label={t("mealUsers.fields.positionNm")}
          name="positionNm"
          autoFocus
        />
        <TextField
          id="createDt"
          {...register("createDt", {
            required: "This field is required",
          })}
          error={!!errors.price}
          margin="normal"
          fullWidth
          label={t("mealUsers.fields.createDt")}
          name="createDt"
          autoFocus
        />
        <TextField
          id="modifyDt"
          {...register("modifyDt", {
            required: "This field is required",
          })}
          error={!!errors.price}
          margin="normal"
          fullWidth
          label={t("mealUsers.fields.modifyDt")}
          name="modifyDt"
          autoFocus
        />
      </Box>
    </Edit>
  );
};
