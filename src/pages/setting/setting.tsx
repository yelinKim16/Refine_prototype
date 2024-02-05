import * as React from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SettingsIcon from "@mui/icons-material/Settings";

import MealSetting from "./MealSetting";
import BaseInfo from "./BaseInfo";

export const Setting: React.FC = () => {
  //Tab
  const [value, setValue] = React.useState("base_info");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="setting tab">
            <Tab label="기본" value="base_info" icon={<SettingsIcon />} />
            <Tab
              label="식수 시간"
              value="meal_type"
              icon={<RestaurantIcon />}
            />
          </TabList>
        </Box>
        <TabPanel value="base_info">
          <BaseInfo />
        </TabPanel>
        <TabPanel value="meal_type">
          <MealSetting />
        </TabPanel>
      </TabContext>
    </Box>
  );
};
