import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import router from './router';
import App from './App.vue';
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import './main.css';

const i18n = createI18n({
  messages: {
    'en-US': en,
    es,
    fr,
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount('#app');

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();
