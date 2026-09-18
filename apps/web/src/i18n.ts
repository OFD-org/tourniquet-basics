import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationUk from "./locales/uk/translation.json";
import translationEn from "./locales/en/translation.json";
import flowEn from "./locales/en/flow.json";

const savedLng =
  typeof window !== "undefined" ? localStorage.getItem("lng") : null;
const initialLng = savedLng === "en" || savedLng === "uk" ? savedLng : "uk";

if (typeof document !== "undefined") {
  document.documentElement.lang = initialLng;
}

i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: translationUk },
    en: { translation: translationEn, flow: flowEn },
  },
  lng: initialLng,
  fallbackLng: "uk",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
