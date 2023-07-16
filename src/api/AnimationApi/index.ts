import request from "@/util/request";
import type { ALLANIMATION } from "./type";

//获取动画列表
export function getAllAnimation(data: ALLANIMATION) {
    return request.get("/getAllAnimation", {
        params: data
    })
}

//获取动画视频
export function getAnimationVideo(animation_id: number) {
    return request.get("/getAnimationVideo", {
        params: {
            animation_id
        }
    })
}

//删除动画
export function deleteAnimation(animation_id: number) {
    return request.delete("/deleteAnimation", {
        params: {
            animation_id
        }
    })
}

//删除动画的某个标签
export function deleteAnimationTag(data: any) {
    return request.delete("/deleteAnimationTag", {
        data
    })
}

//删除动画的某个视频
export function deleteAnimationVideo(video_id: number) {
    return request.delete("/deleteAnimationVideo", {
        params: {
            video_id
        }
    })
}

//添加动画
export function addAnimation(animation: any) {
    return request.post("/addAnimation", animation)
}

//添加动画视频
export function addAnimationVideo(data: any) {
    return request.post("/addAnimationVideo", data)
}

//更新动画
export function updateAnimation(animation: any) {
    return request.post("/updateAnimation", animation)
}

//更新动画视频信息
export function updateAnimationVideo(data: any) {
    return request.post("/updateAnimationVideo", data)
}


