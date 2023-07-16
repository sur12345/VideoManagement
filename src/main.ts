import { createApp } from 'vue'
import App from "@/App.vue"
import "@/styles/global.scss"
import router from "@/router/index"
import install from "@/install/index"
//引入el-message样式
import "element-plus/theme-chalk/el-notification.css"
import "element-plus/theme-chalk/el-message.css"
import "../mock/index.ts"
import "@/permission.ts"
import pinia from "@/store/index.ts"

const app = createApp(App)

app.use(pinia).use(router).use(install)
app.mount('#app')