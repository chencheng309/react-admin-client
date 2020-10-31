import React,{Component} from "react";
import {Card, Button, Table, Modal , Form, Input} from 'antd';
import {formateDate} from "../../utils/dateUtils";
/*
* 角色路由
* */

//表格配置和数据
const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
    },
    {
        title: '创建时间',
        dataIndex: 'datachuangjian',
    },
    {
        title: '授权时间',
        dataIndex: 'datashouquan',
    },
    {
        title:"授权人",
        dataIndex: "nameshouquan"
    }
];
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        datachuangjian: formateDate(Date.now()),
        datashouquan: "",
        nameshouquan:"admin"
    });
}

export default class Role extends Component {
    state = {
        selectedRowKeys: [], //选择框数据
        data, //表格数据
        visible: false  //添加用户
    };
    //显示添加用户组件
    onClick=() => {
        this.setState({
            visible: true,
        });
    }
    //获得添加的值和取消
    handleOk = e => {
        let result=this.state.data;
        result.push(e.user)
        this.setState(state => ({
              visible:false,
              data:[...result]
        }));
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    //权限回调
    start = () => {

    };
    //选择框回调
    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    render() {
        const {  selectedRowKeys } = this.state;
        //左侧选择框配置
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            type:"radio"
        };
        const hasSelected = selectedRowKeys.length > 0;
        //左侧头部
        const title=(
            <div>
                <Button type="primary" onClick={this.onClick}>创建角色</Button>
                <Button type="primary" onClick={this.start} disabled={!hasSelected}  style={{marginLeft:20}}>
                    设置角色权限
                </Button>
            </div>
        )

        return (
            <Card title={title}  style={{ width: "100%" }}>
                <Table
                    bordered={true}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={this.state.data}
                    pagination={{
                        defaultPageSize:"5",
                        showQuickJumper:true
                    }}
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
                            name={['user', 'age']}
                            label="电话"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'website']} label="注册时间">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'useradmin']} label="所属角色">
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