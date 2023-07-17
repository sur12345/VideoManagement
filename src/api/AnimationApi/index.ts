import request from "@/util/request";
import type { ALLANIMATION, DELETEANIMATIONTAG } from "./type";

const enum API {
    GETALLANIMATION = "/getAllAnimation",
    GETANIMATIONVIDEO = "/getAnimationVideo",
    DELETEANIMATION = "/deleteAnimation",
    DELETEANIMATIONTAG = "/deleteAnimationTag",
    DELETEANIMATIONVIDEO = "/deleteAnimationVideo",
    ADDANIMATION = "/addAnimation",
    ADDANIMATIONVIDEO = "/addAnimationVideo",
    UPDATEANIMATION = "/updateAnimation",
    UPDATEANIMATIONVIDEO = "/updateAnimationVideo"
}

//获取动画列表
export function getAllAnimation(data: ALLANIMATION) {
    return request.get(API.GETALLANIMATION, {
        params: data
    })
}

//获取动画视频
export function getAnimationVideo(animation_id: number) {
    return request.get(API.GETANIMATIONVIDEO, {
        params: {
            animation_id
        }
    })
}

//删除动画
export function deleteAnimation(animation_id: number) {
    return request.delete(API.DELETEANIMATION, {
        params: {
            animation_id
        }
    })
}

//删除动画的某个标签
export function deleteAnimationTag(data: DELETEANIMATIONTAG) {
    return request.delete(API.DELETEANIMATIONTAG, {
        data
    })
}

//删除动画的某个视频
export function deleteAnimationVideo(video_id: number) {
    return request.delete(API.DELETEANIMATIONVIDEO, {
        params: {
            video_id
        }
    })
}

//添加动画
export function addAnimation(animation: any) {
    return request.post(API.ADDANIMATION, animation)
}

//添加动画视频
export function addAnimationVideo(data: any) {
    return request.post(API.ADDANIMATIONVIDEO, data)
}

//更新动画
export function updateAnimation(animation: any) {
    return request.post(API.UPDATEANIMATION, animation)
}

//更新动画视频信息
export function updateAnimationVideo(data: any) {
    return request.post(API.UPDATEANIMATIONVIDEO, data)
}