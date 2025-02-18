import { createRouter, createWebHistory, useRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import CalendarView from "@/views/CalendarView.vue";
import SoonView from "@/views/SoonView.vue";
import ContactsView from "@/views/ContactsView.vue";
import EstimatesView from "@/views/EstimatesView.vue";
import InvoicesView from "@/views/InvoicesView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

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
      path: '/estimates',
      name: 'estimates',
      component: EstimatesView,
      meta: { requiresAuth: true, showHeader: false },
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: InvoicesView,
      meta: { requiresAuth: true, showHeader: false },
    },
    {
      path: '/not_found',
      name: 'not_found',
      component: NotFoundView,
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
  try {
    const isAuthenticated = !!localStorage.getItem('bmToken');

    if (to.meta.requiresAuth && !isAuthenticated) {
      // Redirection vers /login si l'utilisateur n'est pas authentifié
      return next({ name: 'login', query: { redirect: to.fullPath } });
    }

    if (to.name === 'login' && isAuthenticated) {
      // Si l'utilisateur est déjà authentifié, redirigez-le vers le tableau de bord
      return next({ name: 'dashboard' });
    }

    // Navigation normale
    next();
  } catch (error) {
    console.error('Erreur lors de la navigation:', error);
    // Redirigez vers une page d'erreur ou affichez un message
    next({ name: 'not_found' });
  }
});

export default router
