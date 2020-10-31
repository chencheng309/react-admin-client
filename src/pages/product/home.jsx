import React, {Component} from "react";
import { Select,Card,Input,Button,Table, Pagination  } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select;

const onSearch = value => console.log(value);
export default class ProductHome extends Component {


    values=this.props.location.state;

    state={
        searchName:"",        //搜索的值
        searchType:"0",     //搜索类型
        data : [
            {
                key: 1,
                name: 'John Brown',
                datenow:"1",
                miaoshu: 'New York No. 1 Lake Park',
                jiage:1888+"$",
                image:require("./images/1.jpg"),
                description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            },
            {
                key: 2,
                name: 'Jim Green',
                datenow:"1",
                miaoshu: 'London No. 1 Lake Park',
                jiage:1388+"$",
                image:require("./images/2.jpg"),
                description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
            },
            {
                key: 3,
                name: 'Not Expandable',
                datenow:"1",
                miaoshu: 'Jiangsu No. 1 Lake Park',
                jiage:2888+"$",
                image:require("./images/3.jpg"),
                description: 'This not expandable',
            },
            {
                key: 4,
                name: 'Joe Black',
                datenow:"1",
                miaoshu: 'Sidney No. 1 Lake Park',
                jiage:6888+"$",
                image:require("./images/4.jpg"),
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
            {
                key: 5,
                name: 'Joe Black',
                datenow:"1",
                miaoshu: 'Sidney No. 1 Lake Park',
                jiage:5888+"$",
                image:require("./images/5.jpg"),
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
            {
                key: 6,
                name: 'Joe Black',
                datenow:"1",
                miaoshu: "Sidney No. 1 Lake Park32",
                jiage:4888+"$",
                image:require("./images/6.jpg"),
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
        ],     //搜索数据
        redata:[
            {
                key: 1,
                name: 'John Brown',
                datenow:"1",
                miaoshu: 'New York No. 1 Lake Park',
                jiage:1888+"$",
                image:require("./images/1.jpg"),
                description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            },
            {
                key: 2,
                name: 'Jim Green',
                datenow:"1",
                miaoshu: 'London No. 1 Lake Park',
                jiage:1388+"$",
                image:require("./images/2.jpg"),
                description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
            },
            {
                key: 3,
                name: 'Not Expandable',
                datenow:"1",
                miaoshu: 'Jiangsu No. 1 Lake Park',
                jiage:2888+"$",
                image:require("./images/3.jpg"),
                description: 'This not expandable',
            },
            {
                key: 4,
                name: 'Joe Black',
                datenow:"1",
                miaoshu: 'Sidney No. 1 Lake Park',
                jiage:6888+"$",
                image:require("./images/4.jpg"),
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
            {
                key: 5,
                name: 'Joe Black',
                datenow:"1",
                miaoshu: 'Sidney No. 1 Lake Park',
                jiage:5888+"$",
                image:require("./images/5.jpg"),
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
            {
                key: 6,
                name: 'Joe Black',
                datenow:"1",
                miaoshu: "Sidney No. 1 Lake Park32",
                jiage:4888+"$",
                image:require("./images/6.jpg"),
                description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
            },
        ],    //静态数据
    }
    //添加商品
    getProduct = () =>{

        const {data}=this.state;
        const result=data;

        if(this.values){
            const dateadd={
                key: data.length+1,
                name: this.values.name,
                datenow:"1",
                miaoshu: this.values.miaoshu,
                jiage:this.values.jiage+"$",
                image:require("./images/"+this.values.image.file.name),
                description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
            }
            result.push(dateadd);
        } else{
            return "";
        }
        this.setState({
            data:result,
            redata:result
        })
    }
    //搜索
    onSearchUp = () => {
        const {searchName,searchType,data}=this.state
        //正则匹配
        const req = eval(`/${searchName}/`)
        const result=[];
        if(searchName){
            if(searchType==="0"){
                data.forEach(item => {
                    if(req.test(item.name)){
                        result.push(item);
                    }
                })
                this.setState({data:result})
            }else if(searchType==="1"){
                data.forEach(item => {
                    if(req.test(item.miaoshu)){
                        result.push(item);
                    }
                })
                this.setState({data:result})
            }
        }else {
            this.setState({
                data:this.state.redata
            })
        }

    }
    //下架
    onSearchRm= (product) =>{
        const {data,redata}=this.state;
        const result=[];
        data.forEach((item,index)=>{
            if(index==product.key-1){
                if(product.datenow=="1"){
                    item.datenow="0"
                }else{
                    item.datenow="1"
                }
            }
            result.push(item);
        })
        this.setState({
            data:result,
            redata:result
        })


    }

    componentWillMount() {
        this.getProduct()
    }
    render() {


        //表格配置
        const columns = [
            { title: '商品名称', dataIndex: 'name', key: 'name' ,width: "20%"},
            { title: '商品描述', dataIndex: 'miaoshu', key: 'miaoshu' ,width:"50%"},
            { title: '价格', dataIndex: 'jiage', key: 'jiage' ,width: "10%"},
            {
                title: '状态',
                dataIndex: "",
                key: "x",
                render: (product)=> {
                   return (
                        <span>
                            <Button type="primary" onClick={() => this.onSearchRm(product)}>
                                {product.datenow == "1" ? "下架" : "上架"}
                            </Button>
                            <p>{product.datenow == "1" ? "在售" : "已下架"}</p>
                        </span>)
                }
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (product) => {
                    return (
                        <a onClick={() => this.props.history.push("/product/detail",product)}>
                            详情 <br/>
                            修改</a>
                    )
                }
            },
        ];

        //左侧
        const title=(
            <span>
              <Select
                defaultValue="0"
                style={{ width: 150 }}
                onChange={value => this.setState({searchType:value})}
                >
                <Option value="0">按名称搜索</Option>
                <Option value="1">按描述搜索</Option>
                </Select>
              <Input placeholder="关键字"
                     style={{ width: 200 , marginLeft:10}}
                     onChange={event => this.setState({ searchName:event.target.value})}
                     onPressEnter={this.onSearchUp}
              />
              <Button type="primary" style={{marginLeft:10}} onClick={this.onSearchUp} >搜索</Button>
            </span>
            )
        //右侧
        const extra = (
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => this.props.history.replace("/product/addupdate")}
                >
                            添加商品
                </Button>
        )


        return (
            <Card title={title}  extra={extra} style={{ width: "100%" } }>
                <Table
                    columns={columns}
                    dataSource={this.state.data}
                    bordered={true}
                    pagination={{
                        defaultPageSize:4,
                        showQuickJumper:true,
                    }}
                />

            </Card>


        )
    }
}