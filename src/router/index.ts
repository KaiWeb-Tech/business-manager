import { createRouter, createWebHistory, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import CalendarView from "@/views/CalendarView.vue";
import SoonView from "@/views/SoonView.vue";
import ContactsView from "@/views/ContactsView.vue";

const route = useRouter();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, showHeader: true },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarView,
      meta: { requiresAuth: true, showHeader: false },
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView,
      meta: { requiresAuth: true, showHeader: false },
    },
    {
      path: '/soon',
      name: 'soon',
      component: SoonView,
      meta: { requiresAuth: true, showHeader: false },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('bmToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
