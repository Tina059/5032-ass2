import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import {useChange} from '../router/change'
import AdminDashboard from '../views/AdminDashboard.vue';

const {isChange } = useChange();
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: RegisterPage 
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard, 
  },
  

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'About' && !isChange.value) {
    alert("Please login first");
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router