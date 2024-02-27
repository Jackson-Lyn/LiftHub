import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/App.vue'
import LoginView from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    //
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
      //
    {
      path: '/dashboard',
      name: 'homeDashboard',
      component: () => import('../views/HomeDashboard.vue')
    },
    {
      path: '/group',
      name: 'groupDashboard',
      component: () => import('../views/GroupDashboard.vue')
    },
    {
      path: '/solo',
      name: 'soloDashboard',
      component: () => import('../views/SoloDashboard.vue')
    },
    {
      path: '/join-group',
      name: 'joinGroup',
      component: () => import('../views/JoinGroup.vue')
    },
    {
      path: '/leaderboard',
      name: 'groupLeaderboard',
      component: () => import('../views/groupLeaderboard.vue')
    },
    {
      path: '/profile',
      name: 'userProfile',
      component: () => import('../views/UserProfile.vue')
    },
    {
      path: '/lift-history',
      name: 'liftHistory',
      component: () => import('../views/PaymentDetails/LiftHistory.vue')
    },
    {
      path: '/progress-tracker',
      name: 'progressTracker',
      component: () => import('../views/PaymentDetails/ProgressTracker.vue')
    },
    {
      path: '/p4p-leaderboard',
      name: 'p4pLeaderboard',
      component: () => import('../views/P4PLeaderboard.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/Admin/AdminDashboard.vue')
    },
    {
      path: '/user-type',
      name: 'userType',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Registration/RegistrationUserType.vue')
    }
  ]
})

export default router
