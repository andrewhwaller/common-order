import { createWebHistory, createRouter } from 'vue-router';
import TheWelcomeScreen from './components/TheWelcomeScreen.vue';
import TheReader from './components/TheReader.vue';
import TheLibrary from './components/TheLibrary.vue';

const history = createWebHistory();
const routes = [
  { path: '/', component: TheWelcomeScreen },
  { path: '/reader', component: TheReader },
  { path: '/library', component: TheLibrary },
];
const router = createRouter({ history, routes });
export default router;
