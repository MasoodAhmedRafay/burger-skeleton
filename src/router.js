import Vue from 'vue'
import Router from 'vue-router'
import Ordering from './views/Ordering.vue'
import OrderingReadyMade from './views/OrderingReadyMade.vue'
import Cart from './components/Cart.vue'
import Menu from './views/Menu.vue'
import Home from './components/Home.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      meta: {
          title: 'Crafty Burgers Home Page',
      },
      name: 'home',
      component: Home
    },
    {
        path: '/menu',
        meta: {
            title: 'Crafty Burgers AB',
        },
        name: 'menu',
        component: Menu
    },
    {
      path: '/ordering',
      meta: {
        title: 'Crafty Burgers AB',
      },
      name: 'ordering',
      component: Ordering
    },
    {
      path: '/orderingReadyMade',
      meta: {
        title: 'Kraft Burgers',
      },
      name: 'Orderingreadymade',
      component: OrderingReadyMade
    },
    {
      path: '/kitchen',
      meta: {
        title: 'Kitchen',
      },
      name: 'kitchen',
      // route level code-splitting
      // this generates a separate chunk (read.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "read" */ './views/Kitchen.vue')
    },
    {
      path: '/cart',
      meta: {
        title: 'Order Cart',
      },
      name: 'cart',
      component: Cart
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;