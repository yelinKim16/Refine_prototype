import { Typography } from "@mui/material";
import { Card, CardContent, Divider, Button } from "@mui/material";
import { Box } from "@mui/material";
import * as React from "react";
import { ISetting } from "interfaces";
import { useForm } from "@refinedev/react-hook-form";
import { Breakfast } from "./mealTimeControl/Breakfast";
import { Lunch } from "./mealTimeControl/lunch";
import { Dinner } from "./mealTimeControl/dinner";

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
          <Lunch />
          <Dinner />
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button type="submit" variant="contained" sx={{ ml: 2 }}>
              등록
            </Button>
          </Box>
        </CardContent>
        <Divider />
      </Card>
    </form>
  );
};

export default MealSetting;
