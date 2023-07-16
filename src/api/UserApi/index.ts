import request from "@/util/request";

//登录
export function login(username: number, password: string) {
    return request.get("/login", {
        params: {
            username,
            password
        }
    })
}

//获取用户信息
export function getUserInfo() {
    return request.get("/getUserInfo")
}