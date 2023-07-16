<script setup lang="ts">
import { } from "vue"
import { getTime } from "@/util/time.ts"
import useUserStore from "@/store/module/user.ts"
import { storeToRefs } from "pinia"

const { username, avatar } = storeToRefs(useUserStore())
</script>

<template>
    <div class="home">
        <div class="top">
            <el-row class="row-1">
                <el-col class="col-1" :span="16">
                    <div class="shadow">
                        <el-card class="card">
                            <div class="avatar-container">
                                <img class="avatar" :src="avatar">
                                <div class="right">
                                    <h3 class="title">{{ getTime() }}好！{{ username }}</h3>
                                    <p class="subtitle">Hello World</p>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
                <el-col class="col-2" :span="8">
                    <div class="shadow">
                        <el-card class="card">
                            <div class="box detail">
                                <span>
                                    个人信息
                                </span>
                                <div>
                                    1
                                </div>
                            </div>
                            <div class="box password">
                                <span>
                                    修改密码
                                </span>
                                <div>
                                    2
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<style lang="scss" scoped>
.home {

    .row-1 {
        padding: 16px;

        .shadow {
            border-radius: 3px;
            height: 100%;
            box-shadow: 0px 1px 8px 0 rgba(242, 109, 109, 0.8);

            &:hover {
                box-shadow: 0px 2px 16px 0 rgba(242, 109, 109, 1);
            }
        }

        .card {
            height: 100%;
            border: none;

            :deep(.el-card__body) {
                height: 100%;
                box-sizing: border-box;
            }
        }

        .col-1 {

            .shadow {
                margin-right: 20px;

                .card {

                    &:hover .title {
                        color: rgb(242, 109, 109);
                    }

                    &:hover .subtitle {
                        text-shadow: 3px 3px rgba(0, 0, 0, 0.5);
                    }

                    .avatar-container {
                        display: flex;
                        align-items: center;
                        height: 100%;

                        .avatar {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                        }

                        .right {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            margin-left: 30px;
                            height: 100%;

                            .title {
                                font-size: 35px;
                                margin-bottom: 5px;
                                transition: all 0.5s;
                            }

                            .subtitle {
                                margin-top: 5px;
                                font-size: 20px;
                                transition: all 0.5s;
                            }
                        }
                    }
                }
            }
        }

        .col-2 {
            .card {
                .box {
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px 20px;
                    box-sizing: border-box;
                    box-shadow: 0px 1px 8px 0 rgba(0, 0, 0, 0.1);
                    font-size: 20px;
                    border-radius: 5px;
                    transition: all 0.5s;
                    transform-origin: center center;

                    &:hover {
                        color: #5af;
                        box-shadow: 0px 2px 16px 0 rgba(0, 0, 0, 0.2);
                        transform: scale(1.05);
                    }

                    &:not(:last-of-type) {
                        margin-bottom: 10px;
                    }

                    div {
                        width: 40px;
                        height: 40px;
                        border-radius: 5px;
                        background-color: rgb(242, 109, 109);
                        line-height: 40px;
                        text-align: center;
                        color: white;
                    }
                }
            }
        }
    }

    .bottom {
        width: 700px;
        height: 400px;
        margin:30px auto;
        background: url("@/assets/images/home.png") 0 0 /100% 100% no-repeat;
    }
}
</style>