import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import FirebaseLoginPage from '../views/FirebaseLoginPage.vue';
import FirebaseRegisterPage from '../views/FirebaseRegisterPage.vue';
import { useChange } from '../router/change';  
import AdminDashboard from '../views/AdminDashboard.vue';
import UserManagementPage from '../views/UserManagementPage.vue';  
import MapView from '../views/MapView.vue';

const { isChange, userRole } = useChange();  

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
        next(); 
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
  history: createWebHistory(process.env.BASE_URL),
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

export default router;
