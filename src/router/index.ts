import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import UserProfile from '../components/UserProfile.vue';
import UserInfoForm from '../components/UserInfoForm.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: UserInfoForm },
  { path: '/profile', component: UserProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
