<script setup lang='ts'>
import VideoItem from "@/components/VideoItem.vue";
//@ts-ignore
import { genFileId } from 'element-plus'
import { reactive, ref, inject, onMounted } from "vue"
//@ts-ignore
import { ElMessage } from "element-plus";

const emit = defineEmits(["changeScene"])
const { getAnimationVideo, addAnimationVideo, updateAnimationVideo, deleteAnimationVideo }: any = inject("API")
const prop = defineProps({
    animation: {
        type: Object,
        required: true
    }
})

const videoList = ref<any>([])
const video = ref<any>({})
const video_address = ref<string>("")

//视频预览显示
const show = ref<boolean>(false)
//对话框显示
const dialogVisible = ref<boolean>(false)

const upload = ref()
const fileList = ref<any>([])

const formInstance = ref<any>()
const rules: any = reactive({
    video_order: [
        {
            required: true,
            message: "集号不能为空",
            trigger: "change"
        }
    ],
    description: [
        {
            required: true,
            message: "描述不能为空",
            trigger: "change"
        }
    ],
    play_address: [{ validator: checkPlay_Address }],
})

//@ts-ignore
function checkPlay_Address(rule: any, value: any, callback: any) {
    if (!video.value.play_address) {
        callback(new Error('请选择视频'))
    } else {
        callback()
    }
}

const addVideo = () => {
    dialogVisible.value = true
}

const changeVideo = (row: any) => {
    video.value = JSON.parse(JSON.stringify(row))
    fileList.value.push({
        name: video.value.play_address.slice(video.value.play_address.lastIndexOf("/") + 1),
        url: video.value.play_address
    })
    dialogVisible.value = true
}

//返回按钮
const onBack = () => {
    emit("changeScene", {
        currentScene: 0,
        getData: true,
        changePage: false
    })
}

//获取视频列表
async function getVideoList() {
    const res = await getAnimationVideo(prop.animation.animation_id)
    if (res.code == 200) {
        videoList.value = res.data.videos
    }
}

const beforeClose = (done: Function) => {
    video.value = {}
    fileList.value = []
    formInstance.value.resetFields()
    done()
}

//关闭对话框的回调
const close = () => {
    dialogVisible.value = false
    video.value = {}
    fileList.value = []
    formInstance.value.resetFields()
}

//对话框确认回调
const confirm = async () => {
    const valid = await formInstance.value.validate((valid: any) => {
        if (!valid) {
            return false
        }
    })
    if (!valid) {
        return
    }
    const video_id = video.value.video_id
    let res
    if (video_id) {
        res = await updateAnimationVideo(video.value)
    } else {
        let flag = videoList.value.every((item: any) => {
            return item.video_order != video.value.video_order
        })
        if (!flag) {
            ElMessage({
                type: "warning",
                message: "集号不能重复"
            })
            return
        }
        res = await addAnimationVideo({
            animation_id: prop.animation.animation_id,
            video: video.value
        })
    }
    if (res.code == 200) {
        ElMessage({
            type: "success",
            message: video_id ? "修改成功" : "添加成功"
        })
        dialogVisible.value = false
        video.value = {}
        fileList.value = []
        formInstance.value.resetFields()
        getVideoList()
    } else {
        ElMessage({
            type: "error",
            message: video_id ? "修改失败" : "添加失败"
        })
    }
}

//预览视频
const watchVideo = (address: string) => {
    video_address.value = address
    show.value = true
}

//删除视频按钮的回调
const deleteVideo = async (video_id: number) => {
    const res = await deleteAnimationVideo(video_id)
    if (res.code == 200) {
        ElMessage({
            type: "success",
            message: "删除成功"
        })
        getVideoList()
    } else {
        ElMessage({
            type: "error",
            message: "删除失败"
        })
    }
}

//文件个数超出限制
const handleExceed = (files: any) => {
    upload.value.clearFiles()
    const file = files[0]
    file.uid = genFileId()
    upload.value.handleStart(file)
    //直接更改文件(不先移除文件)不会自动提交
    upload.value.submit()
}

//上传成功
const uploadSuccess = (res: any) => {
    video.value.play_address = res.data
    formInstance.value.validateField("play_address")
}

const beforeUpload = (rawFile: any) => {
    if (!rawFile.type.includes("video")) {
        ElMessage.error('请选择mp4等视频格式文件')
        return false
    } else if (rawFile.size / 1024 / 1024 > 300) {
        ElMessage.error('视频大小不大于300MB!')
        return false
    }
    return true
}

//移除上传文件
const uploadRemove = () => {
    video.value.play_address = ""
    formInstance.value.validateField("play_address")
}

onMounted(() => {
    getVideoList()
})
</script>

<template>
    <el-card>
        <el-page-header style="margin-bottom: 15px;" @back="onBack">
            <template #content>
                <span>动画视频</span>
            </template>
            <template #extra>
                <el-button @click="addVideo" type="primary">添加视频</el-button>
            </template>
        </el-page-header>
        <el-table :default-sort="{ prop: 'video_order', order: 'ascending' }" :data="videoList" border>
            <el-table-column type="index" label="序号" width="70" align="center">
            </el-table-column>
            <el-table-column sortable align="center" prop="video_order" label="集号" width="100">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="description" label="描述">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="play_address" label="视频地址">
            </el-table-column>
            <el-table-column label="操作" align="center" width="260" v-slot="{ row }">
                <el-button @click="watchVideo(row.play_address)" type="success">视频预览</el-button>
                <el-button @click="changeVideo(row)" type="primary">修改</el-button>
                <el-popconfirm width="200" @confirm="deleteVideo(row.video_id)" :title="`你确定要删除第${row.video_order}集吗?`">
                    <template #reference>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </el-table-column>
        </el-table>
    </el-card>
    <el-dialog :before-close="beforeClose" center v-model="dialogVisible" title="添加剧集" width="80%"
        style="max-width: 500px;">
        <el-form ref="formInstance" :model="video" :rules="rules" label-width="60">
            <el-form-item prop="video_order" label="集号">
                <el-input v-model="video.video_order" placeholder="请输入集号" type="number" />
            </el-form-item>
            <el-form-item prop="description" label="描述">
                <el-input v-model="video.description" placeholder="请输入该集的描述" />
            </el-form-item>
            <el-form-item prop="play_address" label="视频">
                <el-upload v-model:file-list="fileList" ref="upload" action="http://localhost:5173/api/upload" :limit="1"
                    :on-exceed="handleExceed" :on-success="uploadSuccess" :on-remove="uploadRemove"
                    :before-upload="beforeUpload">
                    <template #trigger>
                        <el-button type="primary">选择视频</el-button>
                    </template>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="confirm" type="success">确认</el-button>
            <el-button @click="close" type="primary" plain>取消</el-button>
        </template>
    </el-dialog>
    <Teleport to="body">
        <VideoItem v-model="show" :video_address="video_address"></VideoItem>
    </Teleport>
</template>

<style lang="scss" scoped></style>