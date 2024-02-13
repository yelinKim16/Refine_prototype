import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { HttpError, useList, useUpdate } from "@refinedev/core";
import React from "react";

interface ISetting {
  id: number;
  name: string;
  time: string;
}

export const Dinner: React.FC = () => {
  const { mutate } = useUpdate();

  const { data, isLoading, isError } = useList<ISetting, HttpError>({
    dataProviderName: "settingData",
  });

  const settingList = data?.data ?? [];

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

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
          석식
        </Typography>
        <Box
          sx={{
            alignItems: "flex-end",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <TextField
            id="dinnerStartTime"
            name="dinnerStartTime"
            defaultValue={
              settingList
                ? settingList.find(
                    (setting) => setting.name === "dinnerStartTime"
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
            id="dinnerEndTime"
            name="dinnerEndTime"
            defaultValue={
              settingList
                ? settingList.find(
                    (setting) => setting.name === "dinnerEndTime"
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
    </>
  );
};
