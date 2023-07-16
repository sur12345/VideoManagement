<script setup lang='ts'>
//@ts-ignore
import { ElMessage } from "element-plus";
import { toRefs, ref, onMounted, inject } from "vue"

const { getTags, addAnimation, updateAnimation }: any = inject("API")
const emit = defineEmits(["changeScene"])
const prop = defineProps({
    animation: Object
})
const { animation: currentAnimation } = toRefs(prop)

const animation = ref<any>(JSON.parse(JSON
    .stringify((currentAnimation as any).value)))

animation.value.tag_ids = animation.value.tags?.map((item: any) => {
    return item.tag_id
}) ?? []

const tags = ref<any>([])

const formInstance = ref<any>()
const rules = ref<any>({
    name: [
        { required: true, message: "动画名不能为空", trigger: "change" }
    ],
    description: [
        { required: true, message: "动画简介不能为空", trigger: "change" }
    ],
    address: [
        { required: true, message: "国家不能为空", trigger: "change" }
    ],
    play_time: [
        { required: true, message: "开播时间不能为空", trigger: "change" }
    ],
    cover: [
        { validator: checkImgUrl }
    ]
})

//@ts-ignore
function checkImgUrl(rule: any, value: any, callback: any) {
    if (!animation.value.cover) {
        callback(new Error('请选择封面'))
    } else {
        callback()
    }
}

//@ts-ignore
const uploadSuccess = (res) => {
    animation.value.cover = res.data
    formInstance.value.validateField("cover")
}

const beforeUpload = (rawFile: any) => {
    if (!rawFile.type.includes("image")) {
        ElMessage.error('封面必须为图片格式')
        return false
    } else if (rawFile.size / 1024 / 1024 > 10) {
        ElMessage.error('封面大小不大于10MB!')
        return false
    }
    return true
}

//获取所有标签
async function getTagsArr() {
    const res = await getTags()
    if (res.code == 200) {
        tags.value = res.data.tags
    }
}

async function confirm() {
    const valid = await formInstance.value.validate((valid: any) => {
        if (!valid) {
            return false
        }
    })
    if (!valid) {
        return
    }
    let res
    if (animation.value.animation_id) {
        res = await updateAnimation(animation.value)
    } else {
        animation.value.update_time = animation.value.play_time
        res = await addAnimation(animation.value)
    }
    if (res.code == 200) {
        if (animation.value.animation_id) {
            ElMessage({
                type: "success",
                message: "修改成功"
            })
            emit("changeScene", {
                nextScene: 0,
                getData: true
            })
        } else {
            ElMessage({
                type: "success",
                message: "添加成功"
            })
            emit("changeScene", {
                nextScene: 0,
                getData: true,
                changePage: true
            })
        }
    } else {
        animation.value.animation_id ? ElMessage({
            type: "error",
            message: "修改失败"
        }) : ElMessage({
            type: "error",
            message: "添加失败"
        })
    }
}

function cancel() {
    emit("changeScene", {
        nextScene: 0
    })
}

onMounted(() => {
    getTagsArr()
})
</script>

<template>
    <el-card>
        <el-form ref="formInstance" :model="animation" :rules="rules" label-width="80px">
            <el-form-item prop="name" label="动画名">
                <el-input v-model="animation.name" placeholder="请输入动画名称" />
            </el-form-item>
            <el-form-item prop="description" label="动画简介">
                <el-input v-model="animation.description" type="textarea" placeholder="请输入动画简介"
                    :autosize="{ minRows: 3, maxRows: 8 }" :rows="4" />
            </el-form-item>
            <el-form-item prop="address" label="国家">
                <el-input v-model="animation.address" placeholder="请输入国家" />
            </el-form-item>
            <el-form-item prop="play_time" label="开播时间">
                <el-date-picker v-model="animation.play_time" type="date" placeholder="请选择动画开播时间"
                    value-format="YYYY-MM-DD" />
            </el-form-item>
            <el-form-item label="标签">
                <el-checkbox-group v-model="animation.tag_ids">
                    <el-checkbox style="width: 45px;" v-for="tag in tags" :key="tag.tag_id" :label="tag.tag_id">{{
                        tag.tag_name }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-switch style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949;"
                    v-model="animation.isMovie" active-text="动画电影" inactive-text="动漫" />
                <el-switch style="margin-left: 30px;" v-model="animation.isFinished" active-text="完结" inactive-text="未完结" />
            </el-form-item>
            <el-form-item prop="cover" label="动画封面">
                <el-upload class="avatar-uploader" ref="upload" action="http://127.0.0.1:5173/api/upload"
                    :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeUpload">
                    <img v-if="animation.cover" :src="animation.cover" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <el-button @click="confirm" type="primary">提交</el-button>
        <el-button @click="cancel" type="primary" plain>取消</el-button>
    </el-card>
</template>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader img {
    width: 100px;
    height: 100px;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>