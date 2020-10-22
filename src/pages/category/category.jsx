import React, {Component} from "react";
import {Card, Button,  Table, message} from 'antd';
import {PlusOutlined,ArrowRightOutlined} from "@ant-design/icons"
import {reqCategorys} from "../../api"

//import LinkButton from "../../components/link_button";
/*
* 品类管理路由
* */

export default class Category extends Component {

    state={
        loading:false,
        categorys:[],  //一级分类列表
        subCategorys:[],//二级分类列表
        parentId:"0",
        parentName:"",
    }




    /*
    * 异步获取一级分类列表显示
    * */
    getCategorys=async ()=>{
        //发请求前显示loading
        this.setState({
            loading:true
        })
        const {parentId}=this.state;
        //发送异步ajax请求，获取数据
      const result = await reqCategorys(parentId);

      this.setState({
          loading:false
      })
      if(result.status===0){
        const categorys=result.data;
        if(parentId==="0"){

            //更新状态
            this.setState({
                categorys
            })
        } else{
            this.setState({
                subCategorys:categorys
            })
        }

      }else{
          message.error("获取分类列表失败")
      }
    }
    //二级分类
    showSubCategorys =async (category)=>{

        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{
            //console.log(this.state.parentId)
            this.getCategorys()
        })
    }
    //显示指定一级分类列表
    showCategorys= ()=>{
        this.setState({
            parentId:0,
            parentName:"",
            subCategors:[]
        })
    }
    /*
    * 为第一次render（）准备数据
    * */
    // componentWillUnmount() {
    //     this.initColumns();
    // }
    //发异步ajax请求获取分类列表
    componentDidMount() {
        this.getCategorys();
    }
    render() {
        //读取状态数据
        const {categorys,loading,subCategorys,parentId,parentName}=this.state;

        //card的左侧
        const title= parentId == 0 ? "一级分类列表" : (
            <span>
                <a style={{color:"green"}} onClick={this.showCategorys}>一级分类列表</a>
                <ArrowRightOutlined />
                <span>{parentName}</span>
            </span>
        );
        //card的右侧
        const extra=(
            <Button style={{background:"greenyellow"}}>
                <PlusOutlined />
                添加
            </Button>
        );
        //表格配置
        const columns = [
            {
                title: '分类的名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width:300,
                render: (category) => (
                    <span>

                         <Button type="text" style={{color:"green"}}>修改分类</Button>
                        {this.state.parentId==0 ? <Button type="text" style={{color:"green"}} onClick={()=>this.showSubCategorys(category)}>查看子分类</Button> : null}

                    </span>
                ),
            },

        ];



        return (
            <div>
                <Card title={title} extra={extra} style={{ width: "100%" }}>
                    <Table bordered rowKey="_id" loading={loading} dataSource={parentId=="0" ? categorys : subCategorys} columns={columns} pagination={{defaultPageSize:5,showQuickJumper:true}}/>;
                </Card>

            </div>
        )
    }
}