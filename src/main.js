import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'
import '@storefront-ui/vue/styles.scss'
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css';
import './interceptors/axios'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let language = to.params.lang;
  if (!language) {
    language = 'en'
  }

  i18n.locale = language
  next()
})

const vm = new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
})

export { vm }
vm.$mount('#app')
