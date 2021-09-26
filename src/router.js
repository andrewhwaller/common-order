import { createWebHistory, createRouter } from 'vue-router';
import TheWelcomeScreen from './components/TheWelcomeScreen.vue';
import TheReader from './components/TheReader.vue';
import TheLibrary from './components/TheLibrary.vue';
import TheTextDisplay from './components/TheTextDisplay.vue';
import TheTextSkeleton from './components/TheTextSkeleton.vue';
import The404Screen from './components/The404Screen.vue';

const history = createWebHistory();
const routes = [
  {
    name: 'welcome',
    path: '/',
    component: TheWelcomeScreen,
  },
  {
    path: '/reader',
    component: TheReader,
    children: [
      {
        name: 'reader',
        path: '',
        component: TheTextSkeleton,
      },
      {
        name: 'text',
        path: ':slug',
        component: TheTextDisplay,
      },
    ],
  },
  {
    name: 'library',
    path: '/library',
    component: TheLibrary,
  },
  {
    name: '404',
    path: '/:pathMatch(.*)*',
    component: The404Screen,
  },
];
const router = createRouter({ history, routes });

export default router;
