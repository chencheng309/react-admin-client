import React,{Component} from "react";
import {Redirect} from "react-router-dom";
import "./login.less";
import logo from "../../assets/images/logo .jpg";
import {Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLoing} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
/*
*
* 后台管理的路由组件
* */

//表单组件验证
const NormalLoginForm = (porps) => {

    const onFinish = async(values) => {
        // //统一验证 提交ajax请求
        // const {username,password}=values;
        // //发送请求并获得请求数据
        // const result = await reqLoing(username, password);
        //
        // if(result.status===1){
        //     //登录成功
        //     message.success("登录成功")
        //     //将用户数据保存到memoryUtils中
        //     const user=result.data;
        //     memoryUtils.user=user;//保存到内存中
        //     storageUtils.saveUser(user);//保存到Local中
        //     //一次跳转无法返回,允许返回的为push
           porps.props.history.replace("/");
        //
        // }else{
        //     //登录失败提示错误信息
        //     message.error(result.msg)
        // }
    };

    return (
        <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={onFinish}>
            {/*声明式验证*/}
            <Form.Item name="username"
                       rules={[{required: true, message: '用户名不能为空!'},
                           {min:4,message:'用户名不能少于4位'},
                           {max:12,message:'用户名最多12位'},
                           {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'}
                       ]}>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
            </Form.Item>
            <Form.Item name="password"
                       rules={[{required: true, message: '密码不能为空!'},
                           ({ getFieldValue }) => ({
                               //自定义验证
                               validator(rule, value) {
                                       if(value.length<4){
                                           return Promise.reject('密码必须大于4位');
                                       } else if(value.length>12){
                                            return Promise.reject('密码必须小于12位');
                                        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
                                           return Promise.reject('用户名必须是英文、数字或下划线组成');
                                       }
                                       return Promise.resolve();
                               },
                           }),
                       ]} >
                <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" placeholder="密码" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
}

//登录页面组件
export default class Login extends Component {

    render() {
        //判断用户是否登录,如果登录自动跳转到管理页面
        const user = memoryUtils.user;
        if (user && user._id){
            return <Redirect to="/"/>
        }
            return (
                <div className="login">
                    <header className="login-header">
                        <img src={logo} alt="logo"/>
                        <h1>React项目:后台管理项目</h1>
                    </header>
                    <section className="login-content">
                        <h2>用户登录</h2>
                        <NormalLoginForm props={this.props}></NormalLoginForm>
                    </section>
                </div>
            )

    }

 }
