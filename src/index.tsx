import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./i18n";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import rootReducer from "modules";
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <Provider store={createStore(rootReducer)}>
        <App />
      </Provider>
    </React.Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
