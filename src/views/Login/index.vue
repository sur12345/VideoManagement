<script setup lang="ts">
import { reactive, ref } from "vue"
import useUserStore from "@/store/module/user.ts"
import { useRouter, useRoute } from "vue-router";
//@ts-ignore
import { ElNotification } from "element-plus";
import { getTime } from "@/util/time.ts"

const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const loginForm = reactive({
    username: "212014",
    password: "123456"
})
const formEl = ref()
const route = useRoute()

const loginRules = reactive({
    username: [
        { required: true, min: 4, max: 10, message: "账号长度4-10位", trigger: "change" }
    ],
    password: [
        { required: true, min: 6, max: 15, message: "密码长度6-15位", trigger: "change" }
    ]
})

const login = () => {
    formEl.value.validate(async (valid: any) => {
        if (valid) {
            loading.value = true
            try {
                await userStore.userLogin(loginForm)
                const redirect = <string>route.query.redirect
                await router.push(redirect ? redirect : "/")
                ElNotification({
                    type: "success",
                    message: "欢迎回来",
                    title: `HI,${getTime()}好`,
                    duration: 2000,
                    position: 'bottom-right'
                })
            } catch (error) {
                ElNotification({
                    type: "error",
                    message: (error as Error).message
                })
            } finally {
                loading.value = false
            }
        }
    })
}
</script>

<template>
    <div class="login_container">
        <!-- <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="formEl">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" prefix-icon="Lock" type="password" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default"
                            @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row> -->
        <div class="form_container">
            <h1>XX后台</h1>
            <h2>Hello World</h2>
            <el-form class="login_form" :model="loginForm" :rules="loginRules" ref="formEl">
                <el-form-item prop="username">
                    <el-input class="login_input" v-model="loginForm.username" placeholder="账号" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" class="login_input" v-model="loginForm.password" placeholder="密码"
                        show-password />
                </el-form-item>
                <el-form-item>
                    <el-button round :disabled="!loginForm.username || !loginForm.password" :loading="loading"
                        class="login_btn" type="primary" size="default" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url("@/assets/images/bg.jpg") no-repeat 0 0 /cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .form_container {
        padding: 0 40px 40px;
        border-radius: 24px;
        background-color: white;

        h1 {
            text-align: center;
            margin-top: 64px;
            font-size: 64px;
            line-height: 64px;
        }

        h2 {
            text-align: center;
            margin-top: 8px;
            color: #474747;
            font-size: 12px;
            line-height: 20px;
            font-weight: bold;
        }

        .login_form {
            width: 312px;
            margin-top: 40px;

            .login_input {
                margin: 5px 0;

                :deep(.el-input__wrapper) {
                    padding: 0;
                    box-shadow: none;

                    .el-input__inner {
                        outline: none;
                        color: rgb(71, 71, 71);
                        background-color: rgba(0, 0, 0, 0.04);
                        font-size: 14px;
                        font-weight: normal;
                        line-height: 22px;
                        border-radius: 4px;
                        height: 40px;
                        width: 100%;
                        border: none;
                        box-sizing: border-box;
                        padding: 0px 8px;
                        transition: box-shadow 0.2s ease 0s;

                        &:focus {
                            box-shadow: rgba(0, 150, 250, 0.32) 0px 0px 0px 4px;
                        }
                    }

                    .el-input__suffix {
                        position: absolute;
                        right: 10px;
                    }
                }
            }

            .login_btn {
                width: 100%;
                color: white;
                background-color: #0096fa;
                font-size: 14px;
                line-height: 22px;
                font-weight: bold;
                transition: background-color 0.2s ease 0s, box-shadow 0.2s ease 0s;
                height: 40px;
                border: none;
                margin-top: 24px;

                &:not(:disabled):hover {
                    background-color: #0090f0;
                    box-shadow: rgba(0, 150, 250, 0.32) 0px 0px 0px 4px;
                }

                &:disabled {
                    opacity: 0.32;
                }
            }
        }
    }
}
</style>