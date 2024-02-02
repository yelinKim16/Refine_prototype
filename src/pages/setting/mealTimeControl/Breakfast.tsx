import TextField from "@mui/material/TextField";
import { Box, Typography } from "@mui/material";
import * as React from "react";
import { mockSetting } from "components/mock/mockSetting";

export const Breakfast: React.FC = () => {
  const data = mockSetting;
  const breakfastST = data?.find((item) => item.name === "breakfastStartTime");
  const breakfastET = data?.find((item) => item.name === "breakfastEndTime");

  return (
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
          // {...register("time", { required: true })}
          value={breakfastST?.time}
          label="시작시간"
          type="time"
          margin="normal"
        />
        <Typography sx={{ mb: 3, mr: 3, ml: 3 }}>~</Typography>
        <TextField
          id="end_time"
          value={breakfastET?.time}
          label="종료시간"
          type="time"
          margin="normal"
        />
      </Box>
    </Box>
  );
};
