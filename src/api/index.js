import ajax from "./ajax";
/*
* 接口请求函数
* */

//登录请求
export const reqLoing=(username,password)=>ajax("/login",{username,password},"POST")

//添加请求
//export const reqAddUser=(user)=>ajax("http://localhost:5000/manage/user/add",user,"POST")

//获取一级分类的列表
export const reqCategorys=(parentId)=>ajax("/manage/category/list", {parentId})
//添加分类
export const reqAddcategory=(categoryName)=>ajax("/manage/category/add", {categoryName},"POST")
//更新分类
export const reqUpdateCategory=(categoryId,categoryName)=>ajax("/manage/category/update", {categoryId,categoryName},"POST")
