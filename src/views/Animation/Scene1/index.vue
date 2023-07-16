<script setup lang='ts'>
//@ts-ignore
import { ElMessage } from "element-plus";
import { ref, reactive, inject, onMounted, toRef, computed, watch, nextTick, onBeforeUnmount } from "vue"
import type { ALLANIMATION } from "@/api/AnimationApi/type";

const emit = defineEmits(["changeScene"])
const { getAllAnimation, deleteAnimation, deleteAnimationTag }: any = inject("API")

const disabled = computed(() => {
    return requestData.isMovie == 0 && requestData.searchValue == "" && !animationList.value.length
})

//动画总数
const total = ref<number>(0)

//动画列表
const animationList = ref([])

//动画类型
const animationTypes = ref([
    { label: "全部", type: 0 },
    { label: "动漫", type: 1 },
    { label: "动画电影", type: 2 },
])

//搜索类型
const searchTypes = ref([
    { label: "动漫名称", value: "name" },
    { label: "地区", value: "address" },
    { label: "标签", value: "tag" }
])

//计算类型标签
const searchType = computed(() => {
    return searchTypes.value.find(item => {
        return item.value == searchKey.value
    })?.label
})

//暂存搜索参数
const searchKey = ref<string>("name")
const searchValue = ref<string>("")

//请求参数
const requestData: ALLANIMATION = reactive({
    isMovie: 0,
    page: 1,
    limit: 3,
    searchKey: "name",
    searchValue: ""
})

const table_height = ref<string>("0px")

let timer: any = null

const watcher = watch(() => animationList.value.length, () => {
    nextTick(() => {
        getTableHeight()
        timer = setInterval(() => {
            getTableHeight()
        }, 1000)
        watcher()
    })
})

//设置表格高度
function getTableHeight() {
    const height = parseFloat(getComputedStyle(document.querySelector(".scene1-table .el-table__body") as any).height)
    height > window.innerHeight * 0.514539 ? table_height.value = window.innerHeight * 0.565107 + "px" : table_height.value = height + window.innerHeight * 0.050689 + "px"
}

//复制简介
function copy(text: any) {
    navigator.clipboard.writeText(text);
    ElMessage.success("已复制")
}

//重置请求参数
function reset() {
    searchKey.value = "name"
    searchValue.value = ""
    Object.assign(requestData, {
        isMovie: 0,
        page: 1,
        limit: 3,
        searchKey: "name",
        searchValue: ""
    })
    getAnimationList()
}

//获取动画列表数据
const getAnimationList = async () => {
    const res = await getAllAnimation(requestData)
    if (res.code == 200) {
        animationList.value = res.data.animations
        total.value = res.data.total
    }
}

//搜索按钮回调
const search = () => {
    requestData.searchKey = searchKey.value
    requestData.searchValue = searchValue.value
    getAnimationList()
}

//删除动画
const deleteAnimationById = async (animation_id: number) => {
    const res = await deleteAnimation(animation_id)
    if (res.code == 200) {
        getAnimationList()
        ElMessage.success({
            message: "删除成功",
            type: "success"
        })
    }
}

const pageChange = () => {
    getAnimationList()
}

const limitChange = () => {
    requestData.page = 1
    getAnimationList()
}

const addAnimation = () => {
    emit("changeScene", {
        nextScene: 1,
        currentAnimation: {}
    })
}

const updateAnimation = (animation: any) => {
    emit("changeScene", {
        nextScene: 1,
        currentAnimation: animation
    })
}

const watchAnimation = (animation: any) => {
    emit("changeScene", {
        nextScene: 2,
        currentAnimation: animation
    })
}

//删除动画的某个标签
async function deleteTag(animation_id: number, tag_id: number) {
    const res = await deleteAnimationTag({ animation_id, tag_id })
    if (res.code == 200) {
        getAnimationList()
        ElMessage({
            type: "success",
            message: "删除标签成功"
        })
    } else {
        ElMessage({
            type: "error",
            message: "删除标签失败"
        })
    }
}

onMounted(() => {
    getAnimationList()
    window.onresize = () => {
        getTableHeight()
    }
})

onBeforeUnmount(() => {
    clearInterval(timer)
    window.onresize = null
})

defineExpose({
    page: toRef(requestData, "page"),
    getAnimationList
})
</script>

<template>
    <div>
        <el-card class="card">
            <el-button :disabled="disabled" @click="addAnimation" type="success" icon="Plus">添加</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </el-card>
        <el-card class="scene1">
            <el-row class="scene1-row">
                <el-col :span="6">
                    <el-select @change="getAnimationList" class="animationType" :disabled="disabled"
                        v-model="requestData.isMovie">
                        <el-option v-for="item in animationTypes" :key="item.type" :label="item.label" :value="item.type" />
                    </el-select>
                </el-col>
                <el-col style="text-align: right;" :span="18">
                    <el-input class="search-input" v-model="searchValue" :placeholder="`请输入${searchType}`">
                        <template #prepend>
                            <el-select v-model="searchKey" style="width: 120px">
                                <el-option v-for="item in searchTypes" :label="item.label" :value="item.value" />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button @click="search" icon="Search" />
                        </template>
                    </el-input>
                </el-col>
            </el-row>
            <el-table :height="table_height" class="scene1-table" stripe border :data="animationList">
                <el-table-column align="center" type="index" label="序号" width="70" />
                <el-table-column show-overflow-tooltip prop="name" label="动画名称" width="160" />
                <el-table-column show-overflow-tooltip prop="address" label="国家" width="80" align="center" />
                <el-table-column min-width="300" label="简介" v-slot="{ row }">
                    <el-tooltip placement="top">
                        <template #content>
                            <div class="tooltip-div">
                                {{ row.description }}
                            </div>
                            <div style="margin:3px;display: flex;justify-content: flex-end;">
                                <el-button circle icon="CopyDocument" type="info" size="small"
                                    @click="copy(row.description)"></el-button>
                            </div>
                        </template>
                        <p class="tooltip-p">{{ row.description }}</p>
                    </el-tooltip>
                </el-table-column>
                <el-table-column label="标签" width="250" v-slot="{ row }">
                    <el-tag @close="deleteTag(row.animation_id, tag.tag_id)" style="margin: 5px;" v-for="tag in row.tags"
                        :key="tag.tag_id" closable>
                        {{ tag.tag_name }}
                    </el-tag>
                </el-table-column>
                <el-table-column align="center" label="封面" width="180" v-slot="{ row }">
                    <el-image style="max-width: 140px; max-height: 140px" :src="row.cover" :zoom-rate="1.2"
                        :preview-src-list="[row.cover]" fit="contain" preview-teleported />
                </el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="play_time" label="开播时间" width="120" />
                <el-table-column align="center" show-overflow-tooltip prop="update_time" label="最近更新" width="120" />
                <el-table-column align="center" fixed="right" label="操作" width="200" v-slot="{ row }">
                    <el-button @click="watchAnimation(row)" type="success" icon="View" title="查看剧集"></el-button>
                    <el-button @click="updateAnimation(row)" type="primary" icon="Edit" title="修改动画"></el-button>
                    <el-popconfirm width="200" @confirm="deleteAnimationById(row.animation_id)"
                        :title="`你确定要删除${row.name}吗?`">
                        <template #reference>
                            <el-button type="danger" icon="Delete" title="删除动画"></el-button>
                        </template>
                    </el-popconfirm>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="requestData.page" background
                layout="prev, pager, next,->, jumper, sizes,total" v-model:page-size="requestData.limit"
                :page-sizes="[3, 4, 5, 6]" :total="total" @update:page-size="limitChange"
                @update:current-page="pageChange" />
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
$card-height: 72px;

.card {
    height: $card-height;
}

$scene1-margin-top: 25px;
$scene1-table-margin: 15px;

.scene1 {
    margin-top: $scene1-margin-top;

    .scene1-row {
        .animationType {
            width: 100%;
            max-width: 150px;
        }

        .search-input {
            width: 70%;
            max-width: 700px;

            @media screen and (max-width:992px) {
                width: 100%;
            }
        }
    }

    .scene1-table {
        width: 100%;
        margin: $scene1-table-margin 0;

        @at-root .tooltip-div {
            width: 300px;
            user-select: none;
        }

        .tooltip-p {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            user-select: none;
        }
    }
}
</style>