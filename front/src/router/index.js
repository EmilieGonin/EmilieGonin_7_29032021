import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('../views/Post.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  //reset state error if necessary
  if (store.state.error) {
    store.dispatch("resetError");
  }

  //redirect if not logged in
  const publicPages = ['/login', '/signup'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired) {
    const loggedIn = localStorage.getItem('user');

    if (!loggedIn) {
      return next('/login');
    }
    else {
      const user = JSON.parse(localStorage.getItem("user")).user;
      store.dispatch("checkUser", user.id)
      .then(() => next())
      .catch(() => next('/login'))
    }
  }
  else {
    next()
  }
})

export default router
