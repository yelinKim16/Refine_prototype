import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
// import * as React from "react";
import { HttpError, useList, useUpdate } from "@refinedev/core";
import React from "react";

interface ISetting {
  id: number;
  name: string;
  time: string;
}

export const Breakfast: React.FC = () => {
  const { mutate } = useUpdate();

  const { data, isLoading, isError } = useList<ISetting, HttpError>({
    dataProviderName: "settingData",
  });

  const settingList = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    mutate({
      resource: "settings",
      values: {
        key: e.target.name,
        value: e.target.value,
      },
      id: 1,
    });
  };

  return (
    <>
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
            id="breakfastStartTime"
            name="breakfastStartTime"
            defaultValue={
              settingList
                ? settingList.find(
                    (setting) => setting.name === "breakfastStartTime"
                  )?.time
                : ""
            }
            label="시작시간"
            type="time"
            margin="normal"
            onChange={handleSettingChange}
          />

          <Typography sx={{ mb: 3, mr: 3, ml: 3 }}>~</Typography>
          <TextField
            id="breakfastEndTime"
            name="breakfastEndTime"
            defaultValue={
              settingList
                ? settingList.find(
                    (setting) => setting.name === "breakfastEndTime"
                  )?.time
                : ""
            }
            label="종료시간"
            type="time"
            margin="normal"
            onChange={handleSettingChange}
          />
        </Box>
      </Box>
      <Button type="submit" variant="contained" sx={{ ml: 2 }}>
        등록
      </Button>
    </>
  );
};
