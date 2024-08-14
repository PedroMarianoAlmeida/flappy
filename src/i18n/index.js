import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUsTranslations from "./locales/en-us";
import ptBrTranslations from "./locales/pt-br";

// Obter o idioma do navegador
const languageBrowser = (navigator.language || navigator.userLanguage).toLowerCase();

// Definir o idioma inicial
const initialLanguage = languageBrowser === 'pt-br' ? 'pt-BR' : 'en-US';

i18n
  .use(initReactI18next) // passa i18n para o react-i18next
  .init({
    resources: {
      'pt-BR': {
        translation: ptBrTranslations
      },
      'en-US': {
        translation: enUsTranslations
      }
    },
    lng: initialLanguage, // define o idioma com base na condição
    fallbackLng: 'en-US', // idioma de fallback caso o idioma inicial não tenha a tradução

    interpolation: {
      escapeValue: false // o React já se protege contra XSS
    }
  });

export default i18n;
