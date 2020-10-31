import React, {Component,useState} from "react";
import { Card , Button , Table , Modal  , Form, Input}from "antd";
import {formateDate} from "../../utils/dateUtils";
/*
* 用户路由
* */
//配置
const columns = [
    { title: '用户名', dataIndex: 'name', key: 'name' },
    { title: '邮箱', dataIndex: 'email', key: 'age' },
    { title: '电话', dataIndex: 'address', key: 'address' },
    { title: '注册时间', dataIndex: 'datanow', key: 'datanow' },
    { title: '所属角色', dataIndex: 'nt', key: 'nt' },
    {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: () => {return(<div>
            <a>编辑</a><a style={{marginLeft:30}}>删除</a>
        </div>)},
    },
];
//数据
const data = [];
const j=3;
for (let i = 0; i < 3; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        email: (i+1)*456789+"@qq.com",
        address: (i+3)*456789,
        datanow:formateDate(Date.now()),
        nt:"admin"+i
    });
}

export default class User extends Component {
    state={
        data,
        visible: false,
    }
    //显示创建弹窗
    onClick=() => {
        this.setState({
            visible: true,
        });
    }
    //创建用户
    handleOk = e => {
        e.user.key=j+1;
        let result=this.state.data;
        result.push(e.user)

        this.setState({
            visible: false,
            data:result
        });
      this.close(result)
    };

    close = () => {
        this.props.history.replace("/role")
    }

    //关闭创建弹窗
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    render() {
       const title=(
           <Button type="primary" onClick={this.onClick}>创建用户</Button>
       )

        return (
            <Card title={title} style={{width:"100%"}}>
                <Table
                    columns={columns}
                    dataSource={this.state.data}

                />
                <Modal
                    title="创建用户"
                    visible={this.state.visible}
                    footer={null}
                    closable={false}
                    width={400}
                >
                    <Form  name="nest-messages" onFinish={this.handleOk}>
                        <Form.Item
                            name={['user', 'name']}
                            label="姓名"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="邮件"

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'address']}
                            label="电话"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'datanow']} label="注册时间">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'nt']} label="所属角色">
                            <Input />
                        </Form.Item>

                        <Form.Item style={{marginLeft:100}}>
                            <Button type="primary" onClick={this.handleCancel} style={{marginRight:50}}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit" >
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        )
    }
}