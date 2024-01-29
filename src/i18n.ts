import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import detector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["kr", "en"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // locale files path
    },
    lng: "kr",
    defaultNS: "common",
    fallbackLng: ["kr", "en"],
  });
