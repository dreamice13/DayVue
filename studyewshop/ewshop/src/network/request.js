import axios from "axios";
import {Notify, Toast} from 'vant';
import router from '../router'

export function request(config){
    const instance = axios.create({
        baseURL: 'https://api.shop.eduwork.cn',
        timeout: 5000
    })

    // 请求拦截
    instance.interceptors.request.use(config => {
        // 如果有一个接口需要认证才可以访问，就在这里统一配置
        const token = window.localStorage.getItem('token');
        if(token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        // 直接放行
        return config;
    }, error => {

    })
    // 响应拦截
    instance.interceptors.response.use(res=>{
        // return res.data? res.data : res;
        return res;
    }, error => {
        // 如果需要授权才可以访问的接口，统一去login授权
        if(error.response.status == '401'){
            Toast.fail('请先登录');
            router.push({
                path: '/login'
            })
        }
        // 如果有错误，就在这里面处理，显示错误信息
        Notify({ type: 'warning', message: error.response.data.errors[Object.keys(error.response.data.errors)[0]][0] });
    })

    return instance(config);
}