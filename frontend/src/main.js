import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from './store/index'
import axios from 'axios'

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.params?.origin === 'logout') {
    store.dispatch('logOutDelData');
  }
  const isLoggedIn = store.getters.isLoggedIn;
  console.log(to.matched.some(record => record.meta.requiresAuth), !isLoggedIn)
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

Vue.prototype.$store = store;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)

