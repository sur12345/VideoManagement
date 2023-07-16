<script setup lang='ts'>

const prop = defineProps({
    video_address: {
        type: String,
        required: true
    },
    modelValue: {
        type: Boolean,
        required: true
    }
})
const emit = defineEmits(["update:modelValue"])

function close() {
    emit("update:modelValue", false)
}
</script>

<template>
    <div class="mask" v-if="modelValue">
        <video preload="none" autoplay controls :src="prop.video_address"></video>
        <el-button @click="close" icon="CloseBold" color="rgba(255, 255, 255,0.7)" class="close" type="info"></el-button>
    </div>
</template>

<style lang="scss" scoped>
.mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);

    video {
        width: 70%;

        @media screen and (max-width: 1200px) {
            width: 100%;
        }
    }

    .close {
        position: absolute;
        top: 5%;
        right: 5%;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        font-size: 30px;
    }
}
</style>