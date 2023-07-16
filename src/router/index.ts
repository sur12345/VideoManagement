import { createRouter, createWebHashHistory } from "vue-router"
import { constRoutes } from "./routes"

export default createRouter({
    history: createWebHashHistory(),
    routes:constRoutes,
    //@ts-ignore
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: "smooth" }
        }
    }
})