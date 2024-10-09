import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import FirebaseLoginPage from '../views/FirebaseLoginPage.vue';
import FirebaseRegisterPage from '../views/FirebaseRegisterPage.vue';
import { useChange } from '../router/change';  // 引入 useChange
import AdminDashboard from '../views/AdminDashboard.vue';
import UserManagementPage from '../views/UserManagementPage.vue';  // 请确保路径正确
import MapView from '../views/MapView.vue';

const { isChange, userRole } = useChange();  // 从 useChange 中获取 userRole

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
    component: FirebaseLoginPage
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: FirebaseRegisterPage 
  },
  {
    path: '/manage-users',
    name: 'UserManagementPage',
    component: UserManagementPage,
  },
  {
    path: '/map',
    name: 'MapView',
    component: MapView,
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    beforeEnter: (to, from, next) => {
      if (userRole.value === 'admin') {
        next(); // 允许进入
      } else {
        alert('You do not have permission to access this page.');
        next({ name: 'Home' });
      }
    },
  },
  {
    path: '/admin-email',
    name: 'AdminEmailPage',
    component: () => import('@/views/AdminEmailPage.vue'),
    beforeEnter: (to, from, next) => {
      if (userRole.value === 'admin') {
        next();
      } else {
        alert('You do not have permission to access this page.');
        next({ name: 'Home' });
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局路由守卫，检查是否已登录
router.beforeEach((to, from, next) => {
  if (to.name === 'About' && !isChange.value) {
    alert("Please login first");
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
