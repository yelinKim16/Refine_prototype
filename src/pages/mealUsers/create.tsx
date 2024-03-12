import {
  HttpError,
  IResourceComponentsProps,
  useTranslate,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import { Create } from "@refinedev/mui";
import { useApiUrl } from "@refinedev/core";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import { IMealUser, IFile } from "../../interfaces";
import axios from "axios";

export const MealUsersCreate: React.FC<IResourceComponentsProps> = () => {
  const t = useTranslate();

  const apiUrl = useApiUrl();

  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
    saveButtonProps,
  } = useForm<IMealUser, HttpError, IMealUser>();

  const imageInput = watch("avatar"); //이게 뭔지 알아볼 것 !

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
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <Grid
          container
          marginTop="8px"
          sx={{
            marginX: { xs: "0px" },
            paddingX: { xs: 1, md: 4 },
          }}
        >
          <Grid mb={1} item xs={12} md={4}>
            <Stack gap={1} justifyContent="center" alignItems="center">
              {/* 사진첨부 */}
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
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {t("Add user picture")}
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                {t("must be 480x480 px")}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} sx={{ pr: 3 }}>
            <Stack gap="24px">
              {" "}
              <FormControl>
                <FormLabel
                  required
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "text.primary",
                  }}
                >
                  {t("mealUsers.fields.empNo")}
                </FormLabel>
                <TextField
                  {...register("empNo", {
                    required: t("errors.required.field", {
                      field: "EmpNo",
                    }),
                  })}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
                {errors.empNo && (
                  <FormHelperText error>{errors.empNo.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <FormLabel
                  required
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "text.primary",
                  }}
                >
                  {t("mealUsers.fields.empNm")}
                </FormLabel>
                <TextField
                  {...register("empNm", {
                    required: t("errors.required.field", {
                      field: "EmpNm",
                    }),
                  })}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
                {errors.empNm && (
                  <FormHelperText error>{errors.empNm.message}</FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <FormLabel
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "text.primary",
                  }}
                  required
                >
                  {t("mealUsers.fields.empType")}
                </FormLabel>
                <Controller
                  control={control}
                  name="empType"
                  rules={{
                    required: t("errors.required.common"),
                  }}
                  render={({ field }) => (
                    <RadioGroup id="empType" {...field} row>
                      <FormControlLabel
                        value={"임직원"}
                        control={<Radio />}
                        label={t("임직원")}
                      />
                      <FormControlLabel
                        value={"방문자"}
                        control={<Radio />}
                        label={t("방문자")}
                      />
                    </RadioGroup>
                  )}
                />
                {errors.departmentNm && (
                  <FormHelperText error>
                    {errors.departmentNm.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} sx={{ pr: 3 }}>
            <Stack gap="24px">
              <FormControl>
                <FormLabel
                  required
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "text.primary",
                  }}
                >
                  {t("mealUsers.fields.companyNm")}
                </FormLabel>
                <TextField
                  {...register("companyNm", {
                    required: t("errors.required.field", {
                      field: "CompanyNm",
                    }),
                  })}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
                {errors.companyNm && (
                  <FormHelperText error>
                    {errors.companyNm.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <FormLabel
                  required
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "text.primary",
                  }}
                >
                  {t("mealUsers.fields.departmentNm")}
                </FormLabel>
                <TextField
                  {...register("departmentNm", {
                    required: t("errors.required.field", {
                      field: "DepartmentNm",
                    }),
                  })}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
                {errors.departmentNm && (
                  <FormHelperText error>
                    {errors.departmentNm.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <FormLabel
                  required
                  sx={{
                    marginBottom: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "text.primary",
                  }}
                >
                  {t("mealUsers.fields.positionNm")}
                </FormLabel>
                <TextField
                  {...register("positionNm", {
                    required: t("errors.required.field", {
                      field: "PositionNm",
                    }),
                  })}
                  size="small"
                  margin="none"
                  variant="outlined"
                />
                {errors.positionNm && (
                  <FormHelperText error>
                    {errors.positionNm.message}
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Create>
  );
};
