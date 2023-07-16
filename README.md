```html
<!-- element全局国际化设置 -->
<script setup lang="ts">
    import zhCn from "element-plus/lib/locale/lang/zh-cn"
</script>

<template>
    <el-config-provider :locale="zhCn">
        <router-view />
    </el-config-provider>
</template>
```
