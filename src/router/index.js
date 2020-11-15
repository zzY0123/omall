import Vue from "vue"
import VueRouter from 'vue-router'

// 修复重复点击报错问题
// const originalPush = VueRouter.prototype.push
//   VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
/*
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
*/

const Home = () => import("../views/home/Home.vue")
const Category = () => import("../views/category/Category.vue")
const Cart = () => import("../views/cart/Cart.vue")
const Profile = () => import("../views/profile/Profile.vue")
const Detail = () => import("../views/detail/Detail.vue")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category

  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
