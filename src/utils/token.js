//定义常量的key
const KEY = 'hmmm'


//暴露 保存token的语法

export function setToken(token){
    window.localStorage.setItem(KEY,token)
}

//暴露的 获取token的语法
export function getToken(){
    return window.localStorage.getItem(KEY)
}

//暴露的 删除token的语法
//clearItem删除全部其他token
export function removeToken(){
    window.localStorage.removeItem(KEY)
}
