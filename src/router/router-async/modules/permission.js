export default [
  {
    path: '/permission',
    name: 'Permission',
    component: () => import('@/layout'),
    redirect: 'noRedirect',
    meta: {
      title: '权限测试',
      icon: 'permission',
    },
    children: [
      {
        path: 'page',
        name: 'permissionPage',
        component: () => import('@/views/permission/page'),
        meta: {
          icon: 'permission',
          title: '页面权限',
          desc: '页面权限: 不同权限的用户, 显示不同的菜单入口',
          noCache: true,
          auth: true,
        },
      },
      {
        path: 'directive',
        name: 'permissionDirective',
        component: () => import('@/views/permission/directive'),
        meta: {
          icon: 'permission',
          title: '指令权限',
          desc: '指令权限: 不同权限的用户, 显示不同的菜单入口',
          pageHeader: ['breadcrumb', 'pageInfo'],
          noCache: true,
          auth: true,
        },
      },
    ],
  },
];
