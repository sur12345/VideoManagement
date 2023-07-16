<script setup lang='ts'>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
import Top from "./components/top/index.vue"
import Tourist from "./components/tourist/index.vue"
import Sex from "./components/sex/index.vue"
import Age from "./components/age/index.vue"
import Line from "./components/line/index.vue"
import Map from "./components/map/index.vue"
import mockRequest from "@/util/mockRequest"

const screen = ref()
const echartsData = ref<any>({})
const loading = ref<boolean>(true)

const getEchartsData = async () => {
    const res = await mockRequest.get("/getEchartsData")
    echartsData.value = res.data
}

function getScale(width: number = 1920, height: number = 1080) {
    const w = window.innerWidth / width
    const h = window.innerHeight / height
    return Math.min(w, h)
}

function resize() {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}

onMounted(async () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
    await getEchartsData()
    nextTick(() => {
        loading.value = false
    })
    window.addEventListener("resize", resize)
})

onBeforeUnmount(() => {
    window.removeEventListener("resize", resize)
})
</script>

<template>
    <div class="container" v-loading="loading">
        <div ref="screen" class="screen">
            <el-row class="top">
                <el-col>
                    <Top></Top>
                </el-col>
            </el-row>
            <el-row class="bottom">
                <el-col :span="10" class="left">
                    <Tourist :usernum="echartsData.usernum" :rate="echartsData.rate" class="margin tourist"></Tourist>
                    <Sex :man="echartsData.man" :woman="echartsData.woman" class="margin sex"></Sex>
                    <Age :ageRate="echartsData.ageRate" class="margin age"></Age>
                </el-col>
                <el-col :span="14" class="right">
                    <Map :mapData="echartsData.mapData" class="margin map"></Map>
                    <Line :weekData="echartsData.weekData" class="margin line"></Line>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background: url("./images/bg.png") no-repeat 0 0 / cover;

    .screen {
        width: 1920px;
        height: 1080px;
        transform-origin: left top;
        position: fixed;
        left: 50%;
        top: 50%;

        .margin {
            border: none;
            background-color: rgba($color: #fff, $alpha: 0.3);
        }

        .top {
            width: 100%;
            height: 40px;
        }

        .bottom {
            height: 1040px;
            box-sizing: border-box;
            padding: 30px 10px 0;

            .left {
                height: 100%;
                display: flex;
                flex-direction: column;

                .tourist {
                    flex: 1.2;
                }

                .sex {
                    flex: 1;
                }

                .age {
                    flex: 1;
                }

                .margin {
                    margin-bottom: 15px;

                    &:first-of-type {
                        margin-top: 15px;
                    }
                }
            }

            .right {
                display: flex;
                flex-direction: column;

                .map {
                    flex: 5;
                }

                .line {
                    flex: 2;
                }

                .margin {
                    margin: 0 0 15px 15px;

                    &:first-of-type {
                        margin-top: 15px;
                    }
                }
            }
        }
    }
}
</style>