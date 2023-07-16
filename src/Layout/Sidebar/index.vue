<script setup lang='ts'>
import Menu from "@/components/Menu/index.vue"
import { storeToRefs } from "pinia"
import useUserStore from "@/store/module/user.ts"
import useSettingStore from "@/store/module/setting.ts"

const { collapse } = storeToRefs(useSettingStore())


const userStore = useUserStore()
</script>

<template>
    <div id="sidebar" :class="{ collapse }">
        <el-scrollbar>
            <el-menu :collapse="collapse" router :default-active="$route.path" active-text-color="#ffd04b" text-color="#fff"
                background-color="#333" class="el-menu-vertical-demo">
                <Menu :menuList="userStore.menuRoutes"></Menu>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
#sidebar {
    width: $menu_width;
    height: $menu_height;
    background: $menu_bgColor;
    transition: width 0.6s;

    &.collapse {
        width: $menu_min_width;
    }

    .el-menu-vertical-demo {
        color: white;
        border-right: none;
    }
}
</style>