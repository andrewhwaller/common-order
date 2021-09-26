import { createI18n } from 'vue-i18n';
import supportedLocales from './config/supported-locales';

// const locales = {
//   en: {
//     name: 'English',
//     welcomeHeader: 'Welcome to Common Order!',
//   },
//   es: {
//     name: 'Español',
//     welcomeHeader: '¡Bienvenido a Common Order!',
//   },
// };

const i18n = createI18n({
  locale: 'en-US',
  // locales,
  getSupportedLocales,
});
export default i18n;
