import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/common.json";
import ru from "./locales/ru/common.json";

const resources = {
  en: { common: en },
  ru: { common: ru },
};

const getInitialLanguage = (): string => {
  const saved = localStorage.getItem("time-sync-language");

  if (saved === "en" || saved === "ru") return saved;

  const browserLang = navigator.language.slice(0, 2);

  return browserLang === "ru" ? "ru" : "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "en",
  defaultNS: "common",
  ns: ["common"],
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("time-sync-language", lng);
});

export default i18n;
