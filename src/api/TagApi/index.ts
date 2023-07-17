import request from "@/util/request";
import type { TAG } from "./type";

const enum API {
    GETTAGS = "/getTags",
    DELETETAG = "/deleteTag",
    ADDTAG = "/addTag",
    UPDATETAG = "/updateTag"
}

//获取标签
export function getTags() {
    return request.get(API.GETTAGS)
}

//删除动画标签
export function deleteTag(tag_id: number) {
    return request.delete(API.DELETETAG, {
        params: {
            tag_id
        }
    })
}

//添加动画标签
export function addTag(tag_name: string) {
    return request.post(API.ADDTAG, {
        tag_name
    })
}

//更新标签
export function updateTag(data: TAG) {
    return request.post(API.UPDATETAG, data)
}