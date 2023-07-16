//路由鉴权
import router from "@/router/index.ts";
//@ts-ignore
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import pinia from "@/store/index.ts"
import useUserStore from "./store/module/user";

//右上角不显示加载的圆圈
NProgress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)

//@ts-ignore
router.beforeEach(async (to, from) => {
    NProgress.start()
    const token = userStore.token
    const username = userStore.username
    if (token) {
        if (to.path.indexOf("/login") > -1) {
            return false
        } else {
            if (!username) {
                try {
                    //重新获取用户数据
                    await userStore.userInfo()
                    //跳转并解决刷新白屏问题
                    return {...to}
                } catch (error) {
                    //执行到这里说明token过期或token被修改
                    userStore.userLogout()
                    return { path: "/login", query: { redirect: to.path } }
                }
            } else {
                return true
            }
        }
    } else {
        if (to.path.indexOf("/login") > -1) {
            return true
        } else {
            return { path: "/login", query: { redirect: to.path } }
        }
    }
})

//@ts-ignore
router.afterEach((to, from) => {
    NProgress.done()
})