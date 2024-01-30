import { Show } from "@refinedev/mui";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "@refinedev/react-hook-form";
import { useShow, useTranslate } from "@refinedev/core";
import { IMealUser } from "interfaces";

export const MealUsersShow: React.FC = () => {
  const t = useTranslate();
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
          label={t("mealUsers.fields.empNo")}
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
          label={t("mealUsers.fields.empNm")}
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
          label={t("mealUsers.fields.empType")}
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
          label={t("mealUsers.fields.companyNm")}
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
          label={t("mealUsers.fields.departmentNm")}
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
          label={t("mealUsers.fields.positionNm")}
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
          label={t("mealUsers.fields.createDt")}
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
          label={t("mealUsers.fields.modifyDt")}
          name="modifyDt"
          disabled={true}
        />
      </Box>
    </Show>
  );
};
