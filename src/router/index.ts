// 官方文档：https://vue3js.cn/router4/guide/#html
// 引入vue-router对象
import { createRouter, createWebHistory, createWebHashHistory, ErrorHandler } from "vue-router";
// 引入路由守卫方法
import beforeEach from "/@/router/beforeEach.ts";

/**
 * 定义路由数组
 */
const routes = [
  {// 404路由
    path: '/404',
    name: '404',
    component: ()=>import('/@/views/404.vue')
  },
  {// 后端管理系统路由组
    path: "/admin",
    redirect: "/admin/home",
    name: "admin",
    component: () => import("/@/views/admin.vue"),
    children: [
        {
            path: "home",
            name: "home",
            meta: { 
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            component: () => import("/@/views/admin/Home.vue")
        },
        {
            path: "setting",
            name: "setting",
            meta: { 
              requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            },
            component: () => import("/@/views/admin/Setting.vue")
        },
    ]
  },
  {// 博客主站pc端页面路由
    path: "/pc",
    // redirect: "/pc/index/1/search",
    redirect: "/pc/index",
    name: "pc",
    component: () => import("/@/views/pc.vue"),
    children: [
      {
        // path: "index/:page/:search",
        path: "index",
        name: "首页",
        component: () => import("/@/views/pc/index.vue"),
      },
      {
        path: "articleDetail",
        name: "文章详情",
        component: () => import("/@/views/pc/articleDetail.vue"),
      },
      {
        path: "articleList",
        name: "文章列表",
        component: () => import("/@/views/pc/articleList.vue"),
      },
      {
        path: "placeOnFile",
        name: "归档",
        component: () => import("/@/views/pc/placeOnFile.vue"),
      },
      {
        path: "label",
        name: "标签",
        component: () => import("/@/views/pc/label.vue"),
      },
      {
        path: "about",
        name: "关于",
        component: () => import("/@/views/pc/about.vue"),
      },
      {
        path: "friendlink",
        name: "友情链接",
        component: () => import("/@/views/pc/friendlink.vue"),
      },
      {
        path: "other",
        name: "其他",
        component: () => import("/@/views/pc/other.vue"),
      },
      {
        path: "shoot",
        name: "摄影",
        component: () => import("/@/views/pc/shoot.vue"),
      },
      {
        path: "resume",
        name: "简历",
        component: () => import("/@/views/pc/resume.vue"),
      },
    ]
  },
  {// 博客主站手机端页面路由
    path: "/phone",
    redirect: "/phone/index",
    name: "phone",
    component: () => import("/@/views/phone.vue"),
    children: [
      {
        path: "index",
        name: "index",
        meta: {
          requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        },
        component: () => import("/@/views/phone/Home.vue")
      },
    ]
  },
];

/**
 * 创建路由
 */
const router = createRouter({
  // hash模式：createWebHashHistory，
  // history模式：createWebHistory
  history: createWebHistory("/"),
  // history:createWebHashHistory("/#"),
  routes,
});

/**
 * 路由守卫
 */
router.beforeEach((guard) => {
	beforeEach.checkAuth(guard, router);
});

/**
 * 路由错误回调
 */
router.onError((handler: ErrorHandler) => {
	console.log("error:", handler);
});

/**
 * 输出对象
 */
export default router;
