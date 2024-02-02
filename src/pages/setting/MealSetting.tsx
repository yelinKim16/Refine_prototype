import { Typography } from "@mui/material";
import { Card, CardContent, Divider } from "@mui/material";
import { Box } from "@mui/material";
import * as React from "react";
import { ISetting } from "interfaces";
import { useForm } from "@refinedev/react-hook-form";

import TextField from "@mui/material/TextField";

export const MealSetting: React.FC = (props) => {
  const {
    refineCore: { onFinish, formLoading, queryResult: productQueryResult },
    register,
    handleSubmit,
  } = useForm<ISetting>({
    refineCoreProps: {
      resource: "setting",
      id: 1,
      action: "edit",
    },
  });
  const settings = productQueryResult?.data?.data;

  return (
    <form onSubmit={handleSubmit(onFinish)}>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", ml: 2, mt: 1 }}>
            <Typography sx={{ ml: 1 }} variant="h5">
              식수 시간 설정
            </Typography>
          </Box>
          <Divider />

          <Box>
            <Box
              sx={{
                alignItems: "flex-end",
                display: "flex",
                flexWrap: "wrap",
                m: 3,
              }}
            >
              <Typography
                sx={{
                  mb: 3,
                  mr: 3,
                  fontWeight: "fontWeightBold",
                  color: "text.secondary",
                }}
              >
                조식
              </Typography>
              <Box
                sx={{
                  alignItems: "flex-end",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  id="start_time"
                  {...register("time", { required: true })}
                  label="시작시간"
                  type="time"
                  margin="normal"
                />
                <Typography sx={{ mb: 3, mr: 3, ml: 3 }}>~</Typography>
                <TextField
                  id="end_time"
                  // {...register("time", { required: "This field is required" })}
                  label="종료시간"
                  type="time"
                  margin="normal"
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <input type="submit" value="Submit" />
        </Box>
      </Card>
    </form>
  );
};

export default MealSetting;
