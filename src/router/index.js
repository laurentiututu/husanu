import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import i18n from '../i18n'

const Home = () =>
  import(/* webpackChunkName: "vsf-home" */ '../views/Home.vue');
const Insurances = () =>
  import(/* webpackChunkName: "vsf-insurances" */ '../views/Insurances.vue');
const Loans = () =>
  import(/* webpackChunkName: "vsf-loans" */ '../views/Loans.vue');
const Investments = () =>
  import(/* webpackChunkName: "vsf-investments" */ '../views/Investments.vue');
const Login = () =>
  import(/* webpackChunkName: "vsf-login" */ '../views/Login.vue');
const MyAccount = () =>
  import(/* webpackChunkName: "vsf-my-account" */ '../views/MyAccount.vue');
const Blog = () =>
  import(/* webpackChunkName: "vsf-blog" */ '../views/Blog.vue');
const Article = () =>
  import(/* webpackChunkName: "vsf-article" */ '../views/Article.vue');
const Booking = () =>
  import(/* webpackChunkName: "vsf-booking" */ '../views/Booking.vue');


Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  {
    path: '/',
    redirect: `/${i18n.locale}`
  },
  {
    path:'/:lang',
    component: { render (c) {return c('router-view')} },
    children: [
      { name: 'Home', path: '/', component: Home },
      { name: 'Insurances', path: 'insurances', component: Insurances },
      { name: 'Loans', path: 'loans', component: Loans },
      { name: 'Investments', path: 'investments', component: Investments },
      { name: 'Blog', path: 'blog', component: Blog },
      { name: 'Article', path: 'blog/:slug', component: Article },
      { name: 'Booking', path: 'consultation', component: Booking },
      { name: 'Login', path: 'login', component: Login },
      {
        name: 'MyAccount',
        path: 'my-account',
        component: MyAccount,
        beforeEnter: (to, from, next) => {
          if (localStorage.getItem('token')) {
            next();
          } else {
            next(`/${i18n.locale}/login`);
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
  }
})

export default router
