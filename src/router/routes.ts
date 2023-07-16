import type { RouteRecordRaw } from "vue-router"

export const constRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Layout",
        redirect: "/home",
        component: () => import("@/Layout/index.vue"),
        children: [
            {
                path: "/home",
                component: () => import("@/views/Home/index.vue"),
                meta: {
                    show: true,
                    title: "主页",
                    icon: "HomeFilled"
                }
            }
        ],
        meta: {
            show: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login/index.vue"),
        meta: {
            show: false
        }
    },
    {
        path: "/screen",
        component: () => import("@/views/Screen/index.vue"),
        name: "Screen",
        meta: {
            title: "数据分析",
            show: true,
            icon: "Platform"
        }
    }
]

export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: "/animationcontrol",
        redirect: "/animation",
        name: "AnimationControl",
        component: () => import("@/Layout/index.vue"),
        children: [
            {
                path: "/animation",
                name: "Animation",
                component: () => import("@/views/Animation/index.vue"),
                meta: {
                    show: true,
                    title: "动画管理",
                    icon: "VideoPlay"
                }
            }
        ],
        meta: {
            show: true
        }
    },
    {
        path: "/tagcontrol",
        redirect: "/tag",
        name: "TagControl",
        component: () => import("@/Layout/index.vue"),
        children: [
            {
                path: "/tag",
                name: "Tag",
                component: () => import("@/views/Tag/index.vue"),
                meta: {
                    show: true,
                    title: "标签管理",
                    icon: "List"
                }
            }
        ],
        meta: {
            show: true
        }
    }
]

export const anyRoutes: RouteRecordRaw[] = [
    {
        path: "/:path(.*)*",
        component: () => import("@/components/404.vue"),
        meta: {
            show: false
        },
        //@ts-ignore
        beforeEnter(to, from) {
            if (from.path.indexOf("/login") > -1) {
                return { path: "/home" }
            }
        }
    }
]