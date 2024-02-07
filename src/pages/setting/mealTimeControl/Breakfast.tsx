import TextField from "@mui/material/TextField";
import { Box, Typography, Button } from "@mui/material";
// import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "modules";
import * as type from "modules/setting/types";
import React, { ChangeEvent, useCallback, useEffect } from "react";
import { settingItem } from "modules/setting/types";
import { getSettingList, putSetting } from "modules/setting/actions";
import { changeSetting } from "modules/setting/actions";

export const Breakfast: React.FC = () => {
  const [value, setValue] = React.useState("");

  const dispatch = useDispatch();

  //list 가져오기
  const settingList = useSelector(
    (state: RootState) => state.setting.settingList
  );
  // console.log(settingList);

  const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // const handleSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(changeSetting({ key: e.target.name, value: e.target.value }));
  // };

  // const updateSetting = React.useCallback(
  //   (setting: settingItem) => dispatch(putSetting(setting)),
  //   [dispatch]
  // );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // const loadSetting = useCallback(() => {
  //   dispatch(getSettingList());
  // }, [dispatch]);

  return (
    <form onSubmit={onSubmit}>
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
            name="breakfastStartime"
            defaultValue={settingList[0].breakfastStartTime}
            label="시작시간"
            type="time"
            margin="normal"
            onChange={handleSettingChange}
          />
          <Typography sx={{ mb: 3, mr: 3, ml: 3 }}>~</Typography>
          {/* <TextField
            id="breakfastEndTime"
            name="breakfastEndTime"
            value={settingList[0].breakfastEndTime}
            label="종료시간"
            type="time"
            margin="normal"
            onChange={handleSettingChange}
          /> */}
        </Box>
      </Box>
      <Button type="submit" variant="contained" sx={{ ml: 2 }}>
        등록
      </Button>
    </form>
  );
};
