//导入 axios 请求对象
import axios from 'axios';

import { getToken } from "../utils/token.js";
//登录接口

export function login(data){
    return axios({
        url: process.env.VUE_APP_BASEURL + "/login",
        method: "post",
        withCredentials: true,
        data
      })
}

export function register(data){
  return axios({
    url:process.env.VUE_APP_BASEURL+'/register',
    method:'post',
    withCredentials:true,
    data
  })
}

export function sendsms(data){
  return axios({
    url:process.env.VUE_APP_BASEURL+'/sendsms',
    method:'post',
    withCredentials:true,
    data
  })
}

export function info(){
  return axios({
    url:process.env.VUE_APP_BASEURL+'/info',
    method:'get',
    //跨域 是否携带 cookie
    withCredentials:true,
    //从缓存中获取
    headers:{
      token:getToken()

    }
  });
}

//用户退出
export function logout(){
  return axios({
    url:process.env.VUE_APP_BASEURL+'/logout',
    method:'get',
    //跨域 是否携带 cookie
    withCredentials:true,
    //从缓存中获取
    headers:{
      token:getToken()

    }
  });
}
