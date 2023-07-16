<script setup lang='ts'>
import { } from "vue"

</script>

<template>
    <div>
        <el-empty description="页面不存在" />
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-empty__image) {
    width: 40%;
    svg{
        max-height: 65vh;
    }
}

:deep(.el-empty__description) p {
    font-size: 30px;
}
</style>