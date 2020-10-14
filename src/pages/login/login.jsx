import React,{Component} from "react";
import "./login.less";
import logo from "./imgs/oqn5.png"
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/*
*
* 后台管理的路由组件
* */

//表单组件验证
const NormalLoginForm = () => {

    const onFinish = (err,values) => {
        //统一验证 提交ajax请求
        if(!err){
            console.log("ajax")
        }else{
            console.log("失败")
        }

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


export default class Login extends Component {

    render() {

            return (
                <div className="login">
                    <header className="login-header">
                        <img src={logo} alt="logo"/>
                        <h1>React项目:后台管理项目</h1>
                    </header>
                    <section className="login-content">
                        <h2>用户登录</h2>
                        <NormalLoginForm></NormalLoginForm>
                    </section>
                </div>
            )

    }

 }
