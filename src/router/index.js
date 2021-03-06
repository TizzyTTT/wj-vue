import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import Home from '../components/home/Home'
import TestChemical from '../components/common/TestChemical'
import TestUser from '../components/common/TestUser'
import LibraryIndex from '../components/library/LibraryIndex'
// 路径 编辑

Vue.use(Router)

export default new Router({
  routes: [
    // 下面都是固定的写法
    {
      path: '/',
      redirect: '/TestUser'
    },
    {
      path: '/TestUser',
      name: 'TestUser',
      component: TestUser
    },
    {
      path: '/TestChemical',
      name: 'TestChemical',
      component: TestChemical
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
