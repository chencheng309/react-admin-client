import axios from "axios";
import {message} from "antd";
//ajax封装
export default function ajax(url,data,type){
    //统一处理请求异常
    //在外层包一个自己创建的promise对象
    //在请求出错是=时，不使用reject(error),而是是显示错误提示message.error
    let promise="";
    return new Promise((resolve, reject)=>{
        if(type==='GET'){
             promise=axios.get(url,{
                params:data
            })
        } else {
             promise=axios.post(url,data);
        }

        promise.then((response)=>{
                resolve(response.data)
            }).catch(error=>{
                message.error("请求出错了:"+error.message);
        })
    })
    }


