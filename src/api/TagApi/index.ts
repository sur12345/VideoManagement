import request from "@/util/request";
import type { TAG } from "./type";

//获取标签
export function getTags() {
    return request.get("/getTags")
}

//删除动画标签
export function deleteTag(tag_id: number) {
    return request.delete("/deleteTag", {
        params: {
            tag_id
        }
    })
}

//添加动画标签
export function addTag(tag_name: string) {
    return request.post("/addTag", {
        tag_name
    })
}

//更新标签
export function updateTag(data: TAG) {
    return request.post("/updateTag", data)
}