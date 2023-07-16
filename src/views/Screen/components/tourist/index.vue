<script setup lang='ts'>
import { ref, watchEffect, computed } from "vue"
import * as echarts from "echarts"
import "echarts-liquidfill"

const charts = ref()
const prop = defineProps({
    usernum: {
        type: Number,
        default: 0
    },
    rate: {
        type: Number
    }
})

const people = computed(() => {
    return prop.usernum.toString().padStart(6, '0') + "人"
})

const watch = watchEffect(() => {
    if (prop.rate) {
        const myCharts = echarts.init(charts.value)
        myCharts.setOption({
            series: [
                {
                    type: 'liquidFill',
                    data: [prop.rate, 0.4, 0.2],
                    waveAnimation: true,
                    animationDuration: 3,
                    animationDurationUpdate: 0,
                    radius: '80%',
                    outline: {
                        show: true,
                        borderDistance: 8,
                        itemStyle: {
                            color: "red",
                            borderColor: "#294D99",
                            borderWidth: 8,
                            shadowBlur: 20,
                            shadowColor: 'rgba(0,0,0,0.25)'
                        }
                    }
                },
            ]
        })
        watch()
    }
})
</script>

<template>
    <el-card class="box">
        <div class="number">
            <span>
                访客量：
            </span>
            <span v-for="item in people">{{ item }}</span>
        </div>
        <div class="charts" ref="charts"></div>
    </el-card>
</template>

<style lang="scss" scoped>
.box {

    :deep(.el-card__body) {
        height: 100%;
        box-sizing: border-box;
    }

    .number {
        margin: 25px auto 0;
        display: flex;

        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/total.png) no-repeat 0 0 / 100% 100%;
            color: #29fcff;
            font-size: 20px;
            font-weight: 900;
        }
    }

    .charts {
        width: 100%;
        height: 260px;
    }
}
</style>