export const menus = [
  {
    name: 'Dashboard',
    component: '#',
    path: '/dashboard',
    redirect: '/dashboard/workplace',
    meta: {
      title: '仪表盘',
      icon: 'ant-design:dashboard-filled',
      hidden: false,
      noCache: false,
      breadcrumb: true,
      affix: false,
      noTagsView: false,
      canTo: false,
      alwaysShow: false
    },
    order: 0,
    children: [
      {
        name: 'DashboardWorkplace',
        component: 'views/Dashboard/Workplace',
        path: 'workplace',
        redirect: null,
        meta: {
          title: '工作台',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 0,
        children: []
      },
      {
        name: 'DashboardAnalysis',
        component: 'views/Dashboard/Analysis/Analysis',
        path: 'analysis',
        redirect: null,
        meta: {
          title: '数据概览',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 1,
        children: []
      },
      {
        name: 'DashboardMap',
        component: 'views/Dashboard/Map',
        path: 'map',
        redirect: null,
        meta: {
          title: '用户分布',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 2,
        children: []
      }
    ]
  },
  {
    name: 'Auth',
    component: '#',
    path: '/auth',
    redirect: '/auth/menu',
    meta: {
      title: '权限管理',
      icon: 'ep:lock',
      hidden: false,
      noCache: false,
      breadcrumb: true,
      affix: false,
      noTagsView: false,
      canTo: false,
      alwaysShow: false
    },
    order: 1,
    children: [
      {
        name: 'AuthMenu',
        component: 'views/Admin/Auth/Menu/Menu',
        path: 'menu',
        redirect: null,
        meta: {
          title: '菜单管理',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 1,
        children: []
      },
      {
        name: 'AuthRole',
        component: 'views/Admin/Auth/Role/Role',
        path: 'role',
        redirect: null,
        meta: {
          title: '角色管理',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 2,
        children: []
      },
      {
        name: 'AuthUser',
        component: 'views/Admin/Auth/User/User',
        path: 'user',
        redirect: null,
        meta: {
          title: '用户管理',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 3,
        children: []
      }
    ]
  },
  {
    name: 'System',
    component: '#',
    path: '/system',
    redirect: null,
    meta: {
      title: '系统管理',
      icon: 'ant-design:setting-filled',
      hidden: false,
      noCache: false,
      breadcrumb: true,
      affix: false,
      noTagsView: false,
      canTo: false,
      alwaysShow: false
    },
    order: 2,
    children: [
      {
        name: 'SystemSettings',
        component: 'views/Admin/System/Settings/Settings',
        path: 'settings',
        redirect: null,
        meta: {
          title: '系统配置',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 0,
        children: []
      },
      {
        name: 'SystemDict',
        component: 'views/Admin/System/Dict/Dict',
        path: 'dict',
        redirect: null,
        meta: {
          title: '字典配置',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 1,
        children: []
      },
      {
        name: 'SystemTask',
        component: 'views/Admin/System/Task/Task',
        path: 'task',
        redirect: null,
        meta: {
          title: '定时任务',
          icon: null,
          hidden: false,
          noCache: true,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 1,
        children: []
      }
    ]
  },
  {
    name: 'Screen',
    component: null,
    path: '/screen',
    redirect: '/screen/air',
    meta: {
      title: '智慧大屏',
      icon: 'icon-park-solid:data-sheet',
      hidden: false,
      noCache: false,
      breadcrumb: true,
      affix: false,
      noTagsView: false,
      canTo: false,
      alwaysShow: true
    },
    order: 3,
    children: [
      {
        name: 'ScreenAir',
        component: 'views/Admin/Screen/Air/Air',
        path: 'air',
        redirect: null,
        meta: {
          title: '空气质量',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 0,
        children: []
      }
    ]
  },
  {
    name: 'Resource',
    component: '#',
    path: '/resource',
    redirect: null,
    meta: {
      title: '资源管理',
      icon: 'line-md:image',
      hidden: false,
      noCache: false,
      breadcrumb: true,
      affix: false,
      noTagsView: false,
      canTo: false,
      alwaysShow: true
    },
    order: 4,
    children: [
      {
        name: 'ResourceImages',
        component: 'views/Admin/Resource/Image/Image',
        path: 'images',
        redirect: null,
        meta: {
          title: '图片资源',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 1,
        children: []
      }
    ]
  },
  {
    name: 'Record',
    component: '#',
    path: '/record',
    redirect: null,
    meta: {
      title: '日志管理',
      icon: 'tdesign:catalog',
      hidden: false,
      noCache: false,
      breadcrumb: true,
      affix: false,
      noTagsView: false,
      canTo: false,
      alwaysShow: false
    },
    order: 99,
    children: [
      {
        name: 'RecordLogin',
        component: 'views/Admin/System/Record/Login/Login',
        path: 'login',
        redirect: null,
        meta: {
          title: '登录日志',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 0,
        children: []
      },
      {
        name: 'RecordOperation',
        component: 'views/Admin/System/Record/Operation/Operation',
        path: 'operation',
        redirect: null,
        meta: {
          title: '操作日志',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 1,
        children: []
      },
      {
        name: 'RecordTask',
        component: 'views/Admin/System/Record/Task/Task',
        path: 'task',
        redirect: null,
        meta: {
          title: '调度日志',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 2,
        children: []
      }
    ]
  },
  {
    name: 'Help',
    component: '#',
    path: '/help',
    redirect: null,
    meta: {
      title: '帮助中心',
      icon: 'material-symbols:help-rounded',
      hidden: false,
      noCache: false,
      breadcrumb: true,
      affix: false,
      noTagsView: false,
      canTo: false,
      alwaysShow: true
    },
    order: 100,
    children: [
      {
        name: 'HelpIssueCategory',
        component: 'views/Admin/Help/IssueCategory/IssueCategory',
        path: 'issue/category',
        redirect: null,
        meta: {
          title: '常见问题类别',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 0,
        children: []
      },
      {
        name: 'HelpIssue',
        component: 'views/Admin/Help/Issue/Issue',
        path: 'issue',
        redirect: null,
        meta: {
          title: '常见问题',
          icon: null,
          hidden: false,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 1,
        children: []
      },
      {
        name: 'HelpIssueForm',
        component: 'views/Admin/Help/Issue/components/Write',
        path: 'issue/form',
        redirect: null,
        meta: {
          title: '常见问题表单',
          icon: null,
          hidden: true,
          noCache: false,
          breadcrumb: true,
          affix: false,
          noTagsView: false,
          canTo: false,
          alwaysShow: false
        },
        order: 99,
        children: []
      }
    ]
  }
]
