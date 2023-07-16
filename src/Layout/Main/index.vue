<script setup lang='ts'>


</script>

<template>
    <el-scrollbar id="main">
        <router-view></router-view>
    </el-scrollbar>
</template>

<style lang="scss" scoped>
#main {
    height: calc(100% - $header_height);
    background: $main_bgColor;
    box-sizing: border-box;
    padding: 30px;
    overflow: auto;

    :deep(.el-scrollbar__thumb) {
        opacity: 1;
        background-color: #5af;
    }
}
</style>