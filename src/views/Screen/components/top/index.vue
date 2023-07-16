<script setup lang='ts'>
import { ref, onMounted, onBeforeUnmount } from "vue"
import useSettingStore from "@/store/module/setting.ts"
import { storeToRefs } from "pinia";
import moment from "moment"

const time = ref<string>(moment().format('YYYY年MM月DD日 hh:mm:ss'))

const timer = ref()

const { fullScreen } = storeToRefs(useSettingStore())
const { changeFullScreen } = useSettingStore()

onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
    }, 1000)
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<template>
    <div class="top">
        <div class="left">
            <span @click="$router.push('/')" class="lbtn">首页</span>
        </div>
        <div class="center">
            <div class="title">XX动漫可视化大数据分析</div>
        </div>
        <div class="right">
            <span class="rbtn" @click="changeFullScreen">{{ fullScreen ? '退出全屏' : '全屏' }}</span>
            <span class="time">当前时间{{ time }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.top {
    height: 100%;
    display: flex;

    .left {
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat 0 0 / cover;

        .lbtn {
            cursor: pointer;
            float: right;
            width: 150px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat 0 0 /100% 100%;
            color: #29fcff;
            font-size: 20px;
        }
    }

    .center {
        flex: 2;
        text-align: center;
        line-height: 74px;
        font-size: 30px;
        color: #29fcff;

        .title {
            width: 100%;
            height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat 0 0 /100% 100%;
        }
    }

    .right {
        flex: 1.5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: url(../../images/dataScreen-header-right-bg.png) no-repeat 0 0 / cover;

        .rbtn {
            cursor: pointer;
            width: 150px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat 0 0 /100% 100%;
            color: #29fcff;
            font-size: 20px;
        }

        .time {
            color: #29fcff;
            font-size: 20px;
            margin-right: 40px;
        }
    }

}
</style>