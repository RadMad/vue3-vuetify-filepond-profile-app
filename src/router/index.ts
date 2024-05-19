import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../components/Home.vue';
import UserProfile from '../components/User/UserProfile.vue';
import UserForm from '../components/User/UserForm.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/edit-profile', component: UserForm },
  { path: '/view-profile', component: UserProfile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
