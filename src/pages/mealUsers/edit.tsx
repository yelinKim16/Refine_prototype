import { Edit } from "@refinedev/mui";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "@refinedev/react-hook-form";
import Stack from "@mui/material/Stack";
import { useTranslate, useApiUrl } from "@refinedev/core";
import { Avatar } from "@mui/material";
import Input from "@mui/material/Input";
import { IMealUser, IFile } from "../../interfaces";
export const MealUsersEdit: React.FC = () => {
  const t = useTranslate();

  const apiUrl = useApiUrl(); //api 가져오기

  const {
    saveButtonProps,
    refineCore: { queryResult, autoSaveProps },
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const imageInput = watch("avatar");
  // 사진 첨부 핸들러
  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formData = new FormData();

    const target = event.target;
    const file: File = (target.files as FileList)[0];

    formData.append("file", file);

    const res = await axios.post<{ url: string }>(
      `${apiUrl}/imageFile/upload`,
      formData,
      {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    const { name, size, type, lastModified } = file;

    const imagePaylod: any = {
      name,
      size,
      type,
      lastModified,
      url: res.data,
    };
    setValue("avatar", imagePaylod, {
      shouldDirty: true,
    });
    console.log(imagePaylod);
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        {" "}
        <Stack gap={1} justifyContent="center" alignItems="center">
          <label htmlFor="avatar-input">
            <Input
              id="avatar-input"
              type="file"
              sx={{
                display: "none",
              }}
              onChange={onChangeHandler}
            />
            <input id="file" {...register("avatar")} type="hidden" />
            <Avatar
              sx={{
                cursor: "pointer",
                width: {
                  xs: "120px",
                  md: "160px",
                  lg: "200px",
                },
                height: {
                  xs: "120px",
                  md: "160px",
                  lg: "200px",
                },
              }}
              src={(imageInput as IFile) && (imageInput as IFile).url}
              alt="User Picture"
            />
          </label>
        </Stack>
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
      </Box>
    </Edit>
  );
};
