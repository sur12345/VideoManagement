import { defineStore } from "pinia";
import { ref } from "vue"

export default defineStore("setting", () => {
    //控制菜单折叠及菜单宽度
    const collapse = ref<boolean>(false)

    function changeCollapse() {
        collapse.value = !collapse.value
    }

    const fullScreen = ref<boolean>(false)

    function changeFullScreen() {
        if (document.fullscreenElement) {
            fullScreen.value = false
            document.exitFullscreen()
        } else {
            fullScreen.value = true
            document.documentElement.requestFullscreen()
        }
    }

    return {
        collapse,
        fullScreen,
        changeCollapse,
        changeFullScreen
    }
})