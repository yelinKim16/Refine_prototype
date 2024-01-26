import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useGetIdentity, useGetLocale, useSetLocale } from "@refinedev/core";
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import { ColorModeContext } from "../../contexts/color-mode";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { t, i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();

  const currentLocale = locale();
  const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity<IUser>();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <HamburgerMenu />

          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Stack direction="row" alignItems="center">
              <IconButton
                color="inherit"
                onClick={() => {
                  setMode();
                }}
              >
                {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
              </IconButton>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  disableUnderline
                  value={currentLocale || ""}
                  inputProps={{ "aria-label": "Without label" }}
                  variant="standard"
                >
                  {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                    <MenuItem
                      key={lang}
                      selected={currentLocale === lang}
                      defaultValue={lang || ""}
                      onClick={() => {
                        changeLanguage(lang);
                      }}
                      value={lang || ""}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar
                          sx={{
                            width: "16px",
                            height: "16px",
                            marginRight: "5px",
                          }}
                          src={`/images/flags/${lang}.svg`}
                        />
                        <Typography>{t(`language.${lang}`)}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack
                direction="row"
                gap="4px"
                alignItems="center"
                justifyContent="center"
              >
                {user?.name && (
                  <Typography variant="subtitle2">{user?.name}</Typography>
                )}
                <Avatar src={user?.avatar} alt={user?.name} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
