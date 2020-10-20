import ajax from "./ajax";
/*
* 接口请求函数
* */

//登录请求
export const reqLoing=(username,password)=>ajax("/login",{username,password},"POST")

//添加请求
//export const reqAddUser=(user)=>ajax("http://localhost:5000/manage/user/add",user,"POST")

//

