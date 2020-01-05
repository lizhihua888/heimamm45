import axios from 'axios';

//创建副本
const requrest = axios.create({
    withCredentials:true,
    //基地址
    baseURL:''
})

export default requrest