import { Typography } from "@mui/material";
import { Card, CardContent, Divider } from "@mui/material";
import { Box } from "@mui/material";
import * as React from "react";
import { ISetting } from "interfaces";
import { useForm } from "@refinedev/react-hook-form";
import TextField from "@mui/material/TextField";
import { mockSetting } from "components/mock/mockSetting";
import { Breakfast } from "./mealTimeControl/Breakfast";

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

  const data = mockSetting;
  const breakfastST = data?.find((item) => item.name === "breakfastStartTime");
  const breakfastET = data?.find((item) => item.name === "breakfastEndTime");

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
          <Breakfast />
          <Box></Box>
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
