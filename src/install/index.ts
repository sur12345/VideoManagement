import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { App } from "vue"
import * as API from "@/api/index"

export default {
    install(app: App) {
        //全局注册element图标
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }

        //注入axios实例
        app.provide("API", API)
    }
}