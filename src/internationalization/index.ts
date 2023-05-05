import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import hnTranslation from "./locales/hn.json";

const resources = {
  en: {
    translation: enTranslation
  },
  hn: {
    translation: hnTranslation
  }
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});
i18n.changeLanguage("en");
export default i18n;
