import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 博客管理
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '博客管理', icon: 'el-icon-notebook-2' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '文章管理', icon: 'el-icon-notebook-1' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '分类管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'label',
        name: 'Label',
        component: () => import('@/views/label'),
        meta: { title: '标签管理', icon: 'el-icon-collection-tag' },
      }
    ]
  },

  // 广告管理
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '广告管理', icon: 'el-icon-picture-outline-round' }
      }
    ]
  },
  // 系统管理
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/user',
    name: 'Nested',
    meta: {
      title: '系统管理',
      icon: 'el-icon-setting'
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/nested/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/nested/role/index'),
        meta: { title: '角色管理', icon: 'el-icon-coin' }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/nested/menu/index'),
        meta: { title: '菜单管理', icon: 'el-icon-menu' }
      }

    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '跳转积云后台管理系统', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
