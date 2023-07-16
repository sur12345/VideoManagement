<script setup lang='ts'>
import { } from "vue"
import type { PropType } from "vue"
import type { RouteRecordRaw } from "vue-router"

defineOptions({
    name: "Menu"
})

const props = defineProps({
    menuList: {
        type: Array as PropType<RouteRecordRaw[]>
    }
})
</script>

<template>
    <template v-for="item in props.menuList" :key="item.path">
        <el-menu-item v-if="!item.children && (item as any).meta.show" :index="item.path">
            <el-icon>
                <component :is="(item as any).meta.icon"></component>
            </el-icon>
            <template #title>
                <span>
                    {{ (item as any).meta.title }}
                </span>
            </template>
        </el-menu-item>
        <template v-else-if="item.children && (item as any).meta.show">
            <el-menu-item v-if="item.children.length == 0" :index="item.path">
                <component :is="(item as any).meta.icon"></component>
                <span>{{ (item as any).meta.title }}</span>
            </el-menu-item>
            <Menu v-else-if="item.children.length == 1" :menuList="item.children"></Menu>
            <el-sub-menu v-else :index="item.path">
                <template #title>
                    <component :is="(item as any).meta.icon"></component>
                    <span>{{ (item as any).meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>
    </template>
</template>

<style lang="scss" scoped>
span {
    width: 100%;
    text-align: center;
    font-size: 18px;
}
</style>