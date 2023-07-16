<script setup lang='ts'>
import { } from "vue"
import Header from "@/Layout/Header/index.vue"
import Sidebar from "@/Layout/Sidebar/index.vue"
import Main from "@/Layout/Main/index.vue"
import { storeToRefs } from "pinia"
import useSettingStore from "@/store/module/setting.ts"

const { collapse } = storeToRefs(useSettingStore())
</script>

<template>
    <div id="layout">
        <Sidebar></Sidebar>
        <div class="layout_right" :class="{ collapse }">
            <Header></Header>
            <Main></Main>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#layout {
    display: flex;

    .layout_right {
        width: calc(100% - $menu_width);
        height: $menu_height;
        transition: width 0.6s;

        &.collapse {
            width: calc(100% - $menu_min_width);
        }
    }
}
</style>