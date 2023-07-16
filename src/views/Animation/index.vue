<script setup lang='ts'>
import Scene1 from "@/views/Animation/Scene1/index.vue"
import Scene2 from "@/views/Animation/Scene2/index.vue"
import Scene3 from "@/views/Animation/Scene3/index.vue"
import { ref } from "vue"

const scene = ref<number>(0)
const scene1Instance = ref<any>()
const animation = ref<any>({})

//切换场景
const changeScene = ({ nextScene = 0, getData = false, changePage = false, currentAnimation }: any) => {
    scene.value = nextScene
    if (nextScene == 0) {
        if (changePage) {
            scene1Instance.value.page = 1
            scene1Instance.value.getAnimationList()
        }
        else if (getData) {
            scene1Instance.value.getAnimationList()
        }
    } else{
        animation.value = currentAnimation
    }
}
</script>

<template>
    <Scene1 ref="scene1Instance" v-show="scene == 0" @changeScene="changeScene"></Scene1>
    <Scene2 v-if="scene == 1" :animation="animation" @changeScene="changeScene"></Scene2>
    <Scene3 v-if="scene == 2" :animation="animation" @changeScene="changeScene"></Scene3>
</template>

<style lang="scss" scoped></style>