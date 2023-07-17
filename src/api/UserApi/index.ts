import request from "@/util/request";

const enum API {
    LOGIN = "/login",
    GETUSERINFO = "/getUserInfo"
}

//登录
export function login(username: number, password: string) {
    return request.get(API.LOGIN, {
        params: {
            username,
            password
        }
    })
}

//获取用户信息
export function getUserInfo() {
    return request.get(API.GETUSERINFO)
}