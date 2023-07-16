<script setup lang='ts'>
import { ref, watchEffect } from "vue"
import * as echarts from "echarts"

const prop = defineProps(["ageRate"])

const charts = ref()

const watch = watchEffect(() => {
    if (prop.ageRate) {
        const myCharts = echarts.init(charts.value)
        myCharts.setOption({
            title: {
                text: '年龄比例',
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: 40,
                right: 30,
                orient: "vertical",
                textStyle: {
                    color: "white",
                    fontSize: 14
                }
            },
            series: [
                {
                    name: '年龄人数',
                    type: 'pie',
                    radius: ['50%', '90%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        position: 'inside',
                        color: 'white',
                        fontSize:20
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: prop.ageRate.child, name: '儿童' },
                        { value: prop.ageRate.young, name: '青年' },
                        { value: prop.ageRate.prime, name: '壮年' },
                        { value: prop.ageRate.midlife, name: '中年' },
                        { value: prop.ageRate.elderly, name: '老年' }
                    ]
                }
            ],
            grid: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }
        })
        watch()
    }
})
</script>

<template>
    <el-card class="box">
        <div class="charts" ref="charts"></div>
    </el-card>
</template>

<style lang="scss" scoped>
.box {

    :deep(.el-card__body) {
        height: 100%;
        box-sizing: border-box;
    }

    .charts {
        height: 100%;
    }
}
</style>