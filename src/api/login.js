//导入 axios 请求对象
import axios from 'axios';

//登录接口

export function login(data){
    return axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        withCredentials: true,
        data
      })
}
