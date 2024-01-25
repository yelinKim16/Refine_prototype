import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

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
import dataProvider from "@refinedev/simple-rest";
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
import { mealHistoriesProvider } from "components/mock/mockProvider";
import { usersProvider } from "components/mock/usersProvider";

function App() {
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
                  default: mealHistoriesProvider,
                  userData: usersProvider,
                }}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "mealHistories",
                    list: "/mealHistories",
                    show: "/mealHistories/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "mealUsers",
                    list: "/mealUsers",
                    create: "/mealUsers/create",
                    edit: "/mealUsers/edit/:id",
                    show: "/mealUsers/show/:id",
                    meta: {
                      dataProviderName: "userData",
                      canDelete: true,
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
                      <ThemedLayoutV2 Header={() => <Header isSticky={true} />}>
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
