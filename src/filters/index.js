import Vue from 'vue'

//导入moment.js
import moment from 'moment';

Vue.filter('formatTime',function(value){
    //处理并返回
    return moment(value).format('YYYY🐹MM😻DD')
})