<script setup lang='ts'>
import { } from "vue"
import { useRoute, useRouter } from "vue-router"
import useSettingStore from "@/store/module/setting.ts"
import useUserStore from "@/store/module/user.ts"
import { storeToRefs } from "pinia"

const { collapse, fullScreen } = storeToRefs(useSettingStore())
const { changeCollapse, changeFullScreen } = useSettingStore()
const { username, avatar } = storeToRefs(useUserStore())
const { userLogout } = useUserStore()

const router = useRouter()
const route = useRoute()

const logout = () => {
    userLogout()
    router.push({ path: "/login", query: { redirect: route.path } })
}
</script>

<template>
    <div id="header">
        <div class="left">
            <el-tooltip effect="light" :content="collapse ? '展开' : '折叠'" placement="bottom">
                <el-icon class="collapse" @click="changeCollapse">
                    <component :is="collapse ? 'Expand' : 'Fold'"></component>
                </el-icon>
            </el-tooltip>
        </div>
        <div class="right">
            <el-tooltip effect="light" :content="fullScreen ? '退出全屏' : '全屏'" placement="bottom">
                <el-button circle :color="fullScreen ? '#4b71d7' : '#2a52be'" class="fullScreen" type="success"
                    @click="changeFullScreen" :icon="fullScreen ? 'ZoomOut' : 'ZoomIn'">
                </el-button>
            </el-tooltip>
            <img :src="avatar" class="avatar">
            <el-dropdown>
                <span class="el-dropdown-link username">
                    {{ username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#header {
    background: $header_bgColor;
    height: $header_height;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        display: flex;
        align-items: center;

        .collapse {
            margin-left: 15px;
            font-size: 25px;
            color: rgb(242, 109, 109);

            &:hover {
                color: #5af;
            }
        }
    }

    .right {
        margin-right: 30px;
        display: flex;
        align-items: center;

        .fullScreen {
            font-size: 20px;
            width: 30px;
            height: 30px;
        }

        .avatar {
            width: 30px;
            height: 30px;
            margin: 0 10px;
            border-radius: 50%;
        }

        .username {
            outline: none;
            color: white;
        }
    }
}
</style>