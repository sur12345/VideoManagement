<script setup lang='ts'>
import { ref, reactive, inject, onMounted, nextTick } from "vue"
import type { TAG, TAGLIST } from "@/types/tag.ts"
//@ts-ignore
import { ElMessage } from "element-plus";
const { getTags, addTag, deleteTag, updateTag }: any = inject("API")

const tagList: TAGLIST = reactive([])

const inputList = reactive<any>([])

//保存当前修改的标签在数据库中的值
let flag: string = ""

const buttonVisible = ref<boolean>(true)
const inputValue = ref<string>("")
const inputRef = ref<any>(null)

const effects: any = [
    [
        '',
        'success',
        'info',
        'danger',
        'warning'
    ],
    [
        "dark",
        "light",
        "plain"
    ]
]

const computeTypeAndEffect = (index: number) => {
    const sum = effects[0].length * effects[1].length
    const value = index % sum
    let typeIndex = value % effects[0].length
    let effectIndex = Math.floor((value / effects[0].length))
    return {
        type: effects[0][typeIndex],
        effect: effects[1][effectIndex]
    }
}

//点击存在的标签的回调
const changeTag = (tag: TAG, index: number) => {
    tag.show = true
    flag = tag.tag_name
    inputList[index].focus()
}

//请求修改标签
const inputBlur = async (tag: TAG) => {
    const value = tag.tag_name.trim()
    const exist = tagList.some(item => {
        return tag != item && item.tag_name == value
    })
    if (!value.length) {
        tag.tag_name = flag
        tag.show = false
    } else if (flag == value) {
        tag.show = false
    } else if (exist) {
        ElMessage({
            type: "warning",
            message: "标签名不能重复"
        })
    } else {
        const res = await updateTag({
            tag_id: tag.tag_id,
            tag_name: value
        })
        if (res.code == 200) {
            ElMessage({
                type: "success",
                message: "修改成功"
            })
            tag.show = false
            getTagList()
        } else {
            ElMessage({
                type: "error",
                message: "修改失败"
            })
        }
    }
}

//获取标签列表
const getTagList = async () => {
    const res = await getTags()
    if (res.code == 200) {
        tagList.length = 0
        Object.assign(tagList, res.data.tags)
    }
}

//点击添加的回调
const handleAddTag = () => {
    inputValue.value = ""
    buttonVisible.value = false
    nextTick(() => {
        inputRef.value.input.focus()
    })
}

//请求添加标签
const handleInputConfirm = async () => {
    const value = inputValue.value.trim()
    const exist = tagList.some(item => {
        return item.tag_name == value
    })
    if (!value.length) {
        buttonVisible.value = true
    } else if (exist) {
        ElMessage({
            type: "warning",
            message: "标签名重复"
        })
    } else {
        const res = await addTag(value)
        if (res.code == 200) {
            getTagList()
            buttonVisible.value = true
            ElMessage({
                type: "success",
                message: "添加成功"
            })
        }
        else {
            ElMessage({
                type: "error",
                message: "添加失败"
            })
        }
    }
}

//删除标签
const handleDeteleTag = async (tag_id: number) => {
    const res = await deleteTag(tag_id)
    if (res.code == 200) {
        ElMessage({
            type: "success",
            message: "删除成功"
        })
        getTagList()
    } else {
        ElMessage({
            type: "error",
            message: "删除失败"
        })
    }
}

onMounted(() => {
    getTagList()
})
</script>

<template>
    <el-card>
        <el-divider content-position="left">
            <span style="font-size: 20px;">
                动画标签
            </span>
        </el-divider>
        <template v-for="(tag, index) in tagList" :key="tag.tag_id">
            <el-tag disable-transitions style="cursor: pointer;" closable v-show="!tag.show" @click="changeTag(tag, index)"
                @close="handleDeteleTag(tag.tag_id)" class="tag" size="large" :type="computeTypeAndEffect(index).type"
                :effect="computeTypeAndEffect(index).effect">
                {{ tag.tag_name }}
            </el-tag>
            <transition name="input">
                <el-input v-model="tag.tag_name" placeholder="请输入标签名" @blur="inputBlur(tag)" ref="inputList"
                    v-show="tag.show" class="input" />
            </transition>
        </template>
        <el-button class="add_input" v-if="buttonVisible" @click="handleAddTag">
            + 添加标签
        </el-button>
        <el-input class="add_input" v-else ref="inputRef" v-model="inputValue" @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm" />
    </el-card>
</template>

<style lang="scss" scoped>
.tag {
    margin: 10px;
}

.input {
    width: 150px;
}

.input-enter-from {
    opacity: 0;
}

.input-enter-active {
    transition: all 0.5s;
}

.input-enter-to {
    opacity: 1;
}

.add_input {
    width: 100px;
}
</style>