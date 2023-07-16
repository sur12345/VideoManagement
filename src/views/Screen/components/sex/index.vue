<script setup lang='ts'>
import { ref, watchEffect, computed } from "vue"
import * as echarts from "echarts"

const charts = ref()
const prop = defineProps({
    man: {
        type: Number,
        default: 0
    },
    woman: {
        type: Number,
        default: 0
    }
})

const rate = computed(() => {
    return Number((prop.man / (prop.man + prop.woman) * 100).toFixed(1)) || 0
})

const watch = watchEffect(() => {
    if (rate.value) {
        const myCharts = echarts.init(charts.value)
        myCharts.setOption({
            title: {
                text: "男女比例",
                textStyle: {
                    color: 'white'
                },
                left: "40%",
                z: 100
            },
            xAxis: {
                show: false,
                min: 0,
                max: 100
            },
            yAxis: {
                show: false,
                type: "category"
            },
            series: [
                {
                    type: "bar",
                    barWidth: 30,
                    data: [rate.value],
                    z: 10,
                    itemStyle: {
                        borderRadius: 15
                    }
                },
                {
                    type: "bar",
                    barWidth: 30,
                    data: [100],
                    barGap: "-100%",
                    itemStyle: {
                        borderRadius: 15
                    }
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
        <div class="container">
            <div class="top">
                <el-row>
                    <el-col :span="12" class="rate-box">
                        <div class="sex man">
                            <img src="../../images/man.png" alt="">
                        </div>
                    </el-col>
                    <el-col :span="12" class="rate-box">
                        <div class="sex woman">
                            <img src="../../images/woman.png" alt="">
                        </div>
                    </el-col>
                </el-row>
                <el-row class="rate">
                    <el-col :span="12" class="rate-box">
                        <span style="font-size: 20px;">男士{{ rate }}%</span>
                    </el-col>
                    <el-col :span="12" class="rate-box">
                        <span style="font-size: 20px;">女士{{ (100 - rate).toFixed(1) }}%</span>
                    </el-col>
                </el-row>
            </div>
            <div class="charts" ref="charts"></div>
        </div>
    </el-card>
</template>

<style lang="scss" scoped>
.box {

    :deep(.el-card__body) {
        height: 100%;
        box-sizing: border-box;
    }

    .container {
        width: 75%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

        .top {
            margin-top: 20px;
            height: 160px;

            .sex {
                width: 111px;
                height: 115px;
                display: flex;
                justify-content: center;
                align-items: center;

                &.man {
                    background: url(../../images/man-bg.png) no-repeat;
                }

                &.woman {
                    background: url(../../images/woman-bg.png) no-repeat;
                }
            }

            .rate-box {
                display: flex;
                justify-content: center;
            }

            .rate {
                width: 100%;
                margin: 20px auto;
                display: flex;
                justify-content: space-around;
                color: white;
            }
        }

        .charts {
            width: 100%;
            flex: 1;
        }
    }
}
</style>