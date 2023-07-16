<script setup lang='ts'>
import { ref, watchEffect } from "vue"
import * as echarts from "echarts"
import chinaJSON from "./china.json"

const map = ref()
const prop = defineProps(["mapData"])

const mapData = ref<any>([])

echarts.registerMap("china", chinaJSON as any)

const watch = watchEffect(() => {
    if (prop.mapData) {
        mapData.value = JSON.parse(JSON.stringify(prop.mapData)).sort((a: any, b: any) => {
            return a.value - b.value
        })
        const mapOption = {
            title: {
                text: "用户分布",
                textStyle: {
                    color: "white",
                    fontSize: 35
                },
                left: "center",
                bottom: "bottom",
                z: 100
            },
            visualMap: {
                left: 'right',
                min: 100,
                max: 1000,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                },
                text: ['High', 'Low'],
                calculable: true
            },
            grid: {
                top: 100,
                bottom: 0,
                left: 50,
                right: 50,
            },
            series: [
                {
                    id: 'population',
                    type: 'map',
                    roam: true,
                    map: 'china',
                    animationDurationUpdate: 1000,
                    universalTransition: true,
                    data: mapData.value
                }
            ]
        }
        const barOption = {
            title: {
                text: "用户分布",
                textStyle: {
                    fontSize: 35,
                    color: "white"
                },
                left: "center",
                bottom: "bottom",
                z: 100
            },
            tooltip: {},
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                axisLabel: {
                    rotate: 30
                },
                axisLine: {
                    lineStyle: {
                        color: "white"
                    }
                },
                data: mapData.value.map(function (item: any) {
                    return item.name;
                })
            },
            animationDurationUpdate: 1000,
            series: {
                type: 'bar',
                id: 'population',
                data: mapData.value.map(function (item: any) {
                    return item.value;
                }),
                itemStyle: {
                    color: '#a50026'
                },
                universalTransition: true
            }
        }
        const myCharts = echarts.init(map.value)
        let currentOption: any = mapOption;
        myCharts.setOption(currentOption);
        setInterval(function () {
            currentOption = currentOption === mapOption ? barOption : mapOption;
            myCharts.setOption(currentOption, true);
        }, 5000);
        watch()
    }
})
</script>

<template>
    <el-card class="box">
        <div class="map" ref="map">
        </div>
    </el-card>
</template>

<style lang="scss" scoped>
.box {
    :deep(.el-card__body) {
        height: 100%;
        box-sizing: border-box;
    }

    .map {
        width: 100%;
        height: 100%;
    }
}
</style>