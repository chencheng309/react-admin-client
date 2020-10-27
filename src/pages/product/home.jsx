import React, {Component} from "react";
import { Select,Card,Input,Button,Form,Table, Pagination  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Search } = Input;
const Item=Form.Item;

const onSearch = value => console.log(value);
export default class ProductHome extends Component {
    state={
        searchName:"0",
        searchType:"",
    }

    render() {
        //表单获取数据函数
        function onChange(value) {
            console.log(`selected ${value}`);
        }

        function onSearch(val) {
            console.log('search:', val);
        }
        const onFinish = values => {
            console.log('Success:', values);
        };

        //表格配置
        const columns = [
            { title: '商品名称', dataIndex: 'name', key: 'name' ,width: "20%"},
            { title: '商品描述', dataIndex: 'miaoshu', key: 'miaoshu' ,width:"50%"},
            { title: '价格', dataIndex: 'jiage', key: 'jiage' ,width: "10%"},
            {
                title: '状态',
                dataIndex: "zhuangtai",
                key: "zhuangtai",
                render: ()=><div><Button type="primary">下架</Button> <br/> <span>在售</span></div>
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: () => <div><a>详情</a> <br/> <a>修改</a></div>
            },
        ];
        //表格数据
        const data = [
            {
                key: 1,
                name: 'John Brown',
                miaoshu: 'New York No. 1 Lake Park',
                jiage:1888+"$",
                address: "",
                description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            },
            {
                key: 2,
                name: 'Jim Green',
                miaoshu: 'London No. 1 Lake Park',
                jiage:1388+"$",
                address: "",
                description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
            },
            {
                key: 3,
                name: 'Not Expandable',
                miaoshu: 'Jiangsu No. 1 Lake Park',
                jiage:2888+"$",
                address: "",
                description: 'This not expandable',
            },
            {
                key: 4,
                name: 'Joe Black',
                miaoshu: 'Sidney No. 1 Lake Park',
                jiage:6888+"$",
                address: "",
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
            {
                key: 5,
                name: 'Joe Black',
                miaoshu: 'Sidney No. 1 Lake Park',
                jiage:5888+"$",
                address: "",
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
            {
                key: 6,
                name: 'Joe Black',
                miaoshu: "Sidney No. 1 Lake Park32",
                jiage:4888+"$",
                address: '',
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
        ];
        //左侧
        const title=(
                <Form layout="inline" onFinish={onFinish} >
                      <Item name="sousuo">
                          <Select
                            showSearch
                            style={{ width: 150 }}
                            Value={this.state.searchType}
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            <Option value="0">按名称搜索</Option>
                            <Option value="1">按描述搜索</Option>
                            </Select>
                      </Item>
                      <Item  name="guanjianzi">
                            <Search placeholder="关键字" onSearch={onSearch} style={{ width: 200 , marginLeft:10}} />
                      </Item>
                      <Item >
                            <Button type="primary" style={{marginLeft:10}} htmlType="submit" >搜索</Button>
                      </Item>
                </Form>
            )
        //右侧
        const extra = (
                <Button type="primary" icon={<PlusOutlined />}>
                            添加商品
                        </Button>
        )


        return (
            <Card title={title}  extra={extra} style={{ width: "100%" } }>
                <Table
                    rowKey="Key"
                    columns={columns}
                    dataSource={data}
                    bordered={true}
                    pagination={{
                        defaultPageSize:3,
                        showQuickJumper:true,
                    }}
                />

            </Card>


        )
    }
}