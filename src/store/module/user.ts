import { defineStore } from "pinia";
import { ref } from "vue"
import router from "@/router/index.ts"
import { SET_TOKEN, REMOVE_TOKEN, GET_TOKEN } from "@/util/token.ts"
import { constRoutes, anyRoutes, asyncRoutes } from "@/router/routes";
import { login, getUserInfo } from "@/api/UserApi/index.ts"

//@ts-ignore
import cloneDeep from "lodash/cloneDeep"


//过滤异步路由
function filterAsyncRoute(asyncRoutes: any, routes: any) {
    return asyncRoutes.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length) {
                item.children = filterAsyncRoute(item.children, routes)
            }
            return true
        }
        return false
    })
}

export default defineStore("userStore", () => {
    const username = ref<string>("")
    const avatar = ref<string>("")
    const token = ref<string | null>(GET_TOKEN())
    const menuRoutes = ref<any>(constRoutes)
    let userAsyncRoutes: any = []
    async function userLogin({ username, password }: any) {
        const res: any = await login(username, password)
        if (res.code == 200) {
            token.value = res.data as string
            SET_TOKEN(token.value)
        } else {
            return Promise.reject(new Error(res.message))
        }
    }

    //获取用户信息
    async function userInfo() {
        const res: any = await getUserInfo()
        if (res.code == 200) {
            username.value = res.data.realname
            avatar.value = res.data.avatar
            //获取用户可用的异步路由
            userAsyncRoutes = filterAsyncRoute(cloneDeep(asyncRoutes), res.data.permissions)
            const routes = [...userAsyncRoutes, ...anyRoutes]
            routes.forEach((route: any) => {
                router.addRoute(route)
            })
            menuRoutes.value = [...constRoutes, ...routes]
            return "ok"
        } else {
            return Promise.reject(new Error(res.message))
        }
    }

    //退出登录
    function userLogout() {
        const allRoutes = [...userAsyncRoutes, ...anyRoutes]
        allRoutes.forEach((item: any) => {
            router.removeRoute(item.name)
        })
        REMOVE_TOKEN()
        token.value = null
        username.value = ""
        avatar.value = ""
        menuRoutes.value = constRoutes
    }

    return {
        username,
        avatar,
        token,
        menuRoutes,
        userLogin,
        userInfo,
        userLogout
    }
})