import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* import Vuetify from 'vuetify' */

/* --- Bootstraps --- */
import Bootstraps from 'bootstrap/dist/css/bootstrap.css'
/* import 'vuetify/dist/vuetify.min.css' */
import Css from '@/assets/scss/app.scss'

/* Vue.use(Vuetify) */

Vue.config.productionTip = false

/* --- Global Guard Route --- */

export const bus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

