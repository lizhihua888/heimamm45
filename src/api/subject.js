import axios from 'axios';

//导入token函数
import { getToken } from '../utils/token.js';

const subjectRequest = axios.create({
    //环境变量
    baseURL: process.env.VUE_APP_BASEURL
});

//添加请求拦截器

subjectRequest.interceptors.request.use(
    function(config){
        //在发送之前 干一些事情
        //设置请求头 携带token
        config.headers.token = getToken();

        return config;
    },
    function(error){
        //在请求错误的时候  干一些 事情
        return Promise.reject(error);
    }
);

subjectRequest.interceptors.response.use(
    function(response){
        //对响应的数据 做一些 事情
        // .then 还没触发
        // 把 .data 处理掉 .then中少写一个 .data
        return  response.data;
    },
    function(error){
        //响应出错时, 干一些事情
        return Promise.reject(error);
    }
);

//抽取接口方法
//获取列表


//添加学科
export function subjectAdd(data){
    return subjectRequest({
        url:'/subject/add',
        method:'post',
        data
    })
}

//学科列表
export function subjectList(params){
    return subjectRequest({
        url:'/subject/list',
        method:'get',
        params
    })
}

//学科状态查询
export function subjectStatus(data){
    return subjectRequest({
        url:'/subject/status',
        method:'post',
        data
    })
}

//学科编辑
export function subjectEdit(data){
    return subjectRequest({
        url:'/subject/edit',
        method:'post',
        data
    })
}

//学科删除
export function subjectRemove(data){
    return subjectRequest({
        url:'/subject/c',
        method:'post',
        data
    })
}

