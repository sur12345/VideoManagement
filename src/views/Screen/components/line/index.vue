<script setup lang='ts'>
import { ref, watchEffect } from "vue"
import * as echarts from "echarts"

const line = ref()
const prop = defineProps(["weekData"])

const watch = watchEffect(() => {
    if (prop.weekData) {
        const myCharts = echarts.init(line.value)
        myCharts.setOption({
            title: {
                text: "过去一周网站浏览量",
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                trigger: "axis",
                formatter: "{b}访问量:{c}"
            },
            xAxis: {
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                type: "category",
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: "white"
                    }
                }
            },
            yAxis: {
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "white"
                    }
                },
                axisTick: {
                    show: true
                }
            },
            series: [
                {
                    name: "week",
                    type: "line",
                    data: prop.weekData,
                    smooth: true,
                    lineStyle: {
                        color: "white"
                    },
                    areaStyle: {
                        opacity: 0.5,
                        color: "tomato"
                    }
                }
            ],
            grid: {
                top: 50,
                bottom: 30,
                left: 40,
                right: 10
            }
        })
        watch()
    }
})
</script>

<template>
    <el-card class="box">
        <div class="charts" ref="line"></div>
    </el-card>
</template>

<style lang="scss" scoped>
.box {

    :deep(.el-card__body) {
        height: 100%;
        box-sizing: border-box;
    }

    .charts {
        width: 100%;
        height: 100%;
    }
}
</style>