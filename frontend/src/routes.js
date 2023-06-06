export default [
  {
    path: '/',
    name: 'homePage',
    meta: { requiresAuth: true },
    component: () => import('./components/homePage.vue')
  },
  {
    path: '/createJob',
    name: 'createJob',
    meta: { requiresAuth: true },
    component: () => import('./components/createJob.vue'),
    props(route) {
      return {  myprop: route.params.jobData }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./components/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./components/register.vue')
  },
  {
    path: '/findJob',
    name: 'findJob',
    meta: { requiresAuth: true },
    component: () => import('./components/findJob.vue')
  },
  {
    path: '/myJobs',
    name: 'myJobs',
    meta: { requiresAuth: true },
    component: () => import('./components/myJobs.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { requiresAuth: true },
    component: () => import('./components/profile.vue')
  },
  {
    path: '/editJob/:id',
    name: 'editJob',
    meta: { requiresAuth: true, requiresState: true },
    component: () => import('./components/editJob.vue'),
    props(route) {
      return {  myprop: route.params.jobData }
    }
  },
]