import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useTranslation } from "react-i18next";
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
// import dataProvider from "@refinedev/simple-rest";
import { MealHistoryList, MealHistoryShow } from "pages/mealHistories";
import {
  MealUsersCreate,
  MealUsersEdit,
  MealUsersShow,
  MealUsersList,
} from "pages/mealUsers";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { usersProvider } from "components/mock/usersProvider";
import { settingProvider } from "components/mock/settingProvider";
import "./i18n";
import dataProvider, { axiosInstance } from "@refinedev/simple-rest";
import { apiProvider } from "components/provider/apiProvider";
import { Setting } from "pages/setting";
import { EntryDoor } from "pages/entryDoor/list";
import { workPlaceProvider } from "components/mock/workPlaceProvider";
import { entryDoorProvider } from "components/mock/workEntryDoor";

function App() {
  // npm i react-i18next i18next i18next-http-backend i18next-browser-languagedetector
  // npm install react-i18next i18next --save
  const { t, i18n } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={{
                  // default: mealHistoriesProvider,
                  default: dataProvider("/api"),
                  userData: usersProvider,
                  settingData: settingProvider,
                  workPlace: workPlaceProvider,
                  entryDoor: entryDoorProvider,
                  api: apiProvider("/api", axiosInstance),
                }}
                i18nProvider={i18nProvider}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "mealHistories",
                    list: "/mealHistories",
                    show: "/mealHistories/show/:id",
                    meta: {
                      canDelete: true,
                      dataProviderName: "api",
                    },
                  },
                  {
                    name: "mealUsers",
                    list: "/mealUsers",
                    create: "/mealUsers/create",
                    edit: "/mealUsers/edit/:id",
                    show: "/mealUsers/show/:id",
                    meta: {
                      canDelete: true,
                      dataProviderName: "api",
                    },
                  },
                  {
                    name: "settings",
                    list: "/settings",
                    meta: {
                      dataProviderName: "settingData",
                    },
                  },
                  {
                    name: "workPlace",
                    list: "/workPlace",
                    meta: {
                      dataProviderName: "workPlace",
                    },
                  },
                  {
                    name: "entryDoor",
                    list: "/entryDoor",
                    meta: {
                      dataProviderName: "entryDoor",
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "ZSD3sT-Mh9LMq-5ApObt",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2 Header={() => <Header />}>
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="mealHistories" />}
                    />
                    <Route path="/mealHistories">
                      <Route index element={<MealHistoryList />} />
                      <Route path="show/:id" element={<MealHistoryShow />} />
                    </Route>
                    <Route path="/mealUsers">
                      <Route index element={<MealUsersList />} />
                      <Route path="create" element={<MealUsersCreate />} />
                      <Route path="edit/:id" element={<MealUsersEdit />} />
                      <Route path="show/:id" element={<MealUsersShow />} />
                    </Route>
                    <Route path="/settings">
                      <Route index element={<Setting />} />
                    </Route>
                    <Route path="/workPlace">
                      <Route index element={<EntryDoor />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
