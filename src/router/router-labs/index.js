export default [
  // labs
  {
    path: '/labs',
    name: 'Labs',
    component: () => import('@/layout'),
    redirect: '/labs/index',
    meta: {
      icon: 'labs',
      title: '实验室',
    },
    children: [
      {
        path: 'card',
        name: 'LabsCard',
        component: () => import('@/views/labs/card'),
        meta: {
          title: '卡片',
          desc: '卡片内容展示组件',
          // pageHeader: ['breadcrumb'],
        },
      },
      {
        path: 'filter',
        name: 'LabsFilter',
        component: () => import('@/views/labs/filter'),
        meta: {
          title: '全局过滤器',
        },
      },
      {
        path: 'directive',
        name: 'LabsDirective',
        component: () => import('@/views/labs/directive'),
        meta: {
          title: '全局指令',
        },
      },
      {
        path: 'flex',
        name: 'LabsFlex',
        component: () => import('@/views/labs/flex'),
        meta: {
          title: '弹性布局',
        },
      },
      {
        path: 'precision',
        name: 'LabsPrecision',
        component: () => import('@/views/labs/precision'),
        meta: {
          title: 'Precision 小数精准度',
        },
      },
      {
        path: 'tabs-page',
        name: 'LabsTabsPage',
        component: () => import('@/views/labs/tabs-page'),
        meta: {
          title: '标签页',
          pageHeader: ['breadcrumb'],
        },
      },
    ],
  },

  // list
  {
    path: '/list',
    name: 'List',
    component: () => import('@/layout'),
    redirect: '/list/table-list',
    meta: {
      title: '列表页面',
    },
    children: [
      {
        path: 'table-list',
        name: 'ListTable',
        component: () => import('@/views/list/table-list'),
        meta: {
          icon: 'list',
          title: '查询表格',
          pageHeader: ['breadcrumb'],
        },
      },
    ],
  },

  // component
  {
    path: '/components',
    name: 'Components',
    component: () => import('@/layout'),
    redirect: '/components/status',
    meta: {
      title: '组件',
      icon: 'components',
    },
    children: [
      {
        path: 'status',
        name: 'ComponentsStatus',
        component: () => import('@/views/components-demo/status.vue'),
        meta: {
          title: '状态标签',
        },
      },
      {
        path: 'sticky',
        name: 'ComponentsSticky',
        component: () => import('@/views/components-demo/sticky.vue'),
        meta: {
          title: '滚动吸附',
        },
      },
      {
        path: 'count-to',
        name: 'ComponentsCountTo',
        component: () => import('@/views/components-demo/count-to.vue'),
        meta: {
          title: '计数效果',
        },
      },
      {
        path: 'upload',
        name: 'ComponentsUpload',
        component: () => import('@/views/components-demo/upload.vue'),
        meta: {
          title: '图片、文件上传|下载',
        },
      },
      {
        path: 'org-tree-demo',
        name: 'OrgTreeDemo',
        component: () => import('@/views/components-demo/org-tree.vue'),
        meta: {
          title: '组织架构图',
        },
      },
    ],
  },
];
