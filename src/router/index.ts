import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import UserProfile from '../components/UserProfile.vue';
import UserInfoForm from '../components/UserInfoForm.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/edit-profile', component: UserInfoForm },
  { path: '/view-profile', component: UserProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
