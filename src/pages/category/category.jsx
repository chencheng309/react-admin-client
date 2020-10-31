import React, {Component} from "react";
import {Card, Button, Table, message, Modal, Form, Select, Input} from 'antd';
import {PlusOutlined,ArrowRightOutlined} from "@ant-design/icons";
import {reqCategorys,reqUpdateCategory,reqAddcategory} from "../../api"
const Item = Form.Item;
const {Option} = Select;

/*
* 品类管理路由
* */

export default class Category extends Component {
    //formRef = React.createRef<FormInstance>();
    state={
        loading:false, //是否正在获取数据中
        categorys:[],  //一级分类列表
        subCategorys:[],//二级分类列表
        parentId:"0", //当前需要显示的分类列表的父分类ID
        parentName:undefined,//当前需要显示的分类列表的父分类名称
        showStatus:0,//标识添加/更新的确认框是否显示,0:都不显示,1:显示添加,2:显示更新
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
    * 响应点击取消:隐藏确定框
    * */
    handleCancel=()=>{
        //清除输入数据
        //隐藏
        this.setState({
            showStatus: 0
        })
    }
    //显示添加的确认框
    showAdd = ()=>{
        this.setState({
            showStatus:1
        })
    }
    onStringChange= e=>{
        this.categoryName=e.target.value;
    }
    //添加分类
    addCategory = async ()=>{
        console.log("addcategory")
        //隐藏确认框
        this.setState({
            showStatus:0
        })
        //收集数据
        const categoryName=this.categoryName;
        const result=await reqAddcategory(categoryName)
        if(result.status==0){
            this.getCategorys()
        }
    }

    //显示修改的确认框
    showupdate = (category)=>{
        //保存分类对象
        this.category=category;
        this.setState({
            showStatus:2
        })
    }
    //解决组件数据传输问题
    onNumberChange= e=>{
        this.category.name=e.target.value;
    }
    //更新分类
    updateCategory =async ()=>{

        //隐藏确定框
        this.setState({
            showStatus:0
        })
        const categoryId = this.category._id;
        const categoryName = this.category.name;
        //清除输入数据

        //发请求更新分类
        const result=await reqUpdateCategory(categoryId,categoryName)
        if(result.status==0){
            //重新显示列表
            this.getCategorys()
        }


    }
    //发异步ajax请求获取分类列表
    componentDidMount() {
        this.getCategorys();
    }
    render() {
        //读取状态数据
        const {categorys,loading,subCategorys,parentId,parentName,showStatus}=this.state;
        //读取指定的分类
        const category=this.category || {};
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
            <Button style={{background:"greenyellow"}} onClick={this.showAdd}>
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
                render: (categorys) => (
                    <span>

                         <Button type="text" style={{color:"green"}} onClick={()=>{this.showupdate(categorys)}}>修改分类</Button>
                        {this.state.parentId==0 ? <Button type="text" style={{color:"green"}} onClick={()=>this.showSubCategorys(categorys)}>查看子分类</Button> : null}

                    </span>
                ),
            },

        ]


        return (
            <div>
                <Card title={title} extra={extra} style={{ width: "100%" }}>
                    <Table bordered rowKey="_id" loading={loading} dataSource={parentId=="0" ? categorys : subCategorys} columns={columns} pagination={{defaultPageSize:5,showQuickJumper:true}}/>
                    <Modal
                        title="添加分类"
                        visible={showStatus===1}
                        onOk={this.addCategory}
                        onCancel={this.handleCancel}
                    >
                            <Form>
                                <Item>
                                    <Select defaultValue="0">

                                        {parentName === undefined ?
                                            (<Option value="0">一级分类</Option>) :
                                            (<Option value="0">{parentName}</Option>)}
                                        {
                                            categorys.map( c => <Option value={c._id}>{c.name}</Option>)
                                        }
                                    </Select>
                                </Item>


                                <Item>
                                    <Input placeholder="请输入分类名称" onChange={this.onStringChange}/>
                                </Item>

                            </Form>
                    </Modal>
                    <Modal
                        title="更新分类"
                        visible={showStatus===2}
                        onOk={this.updateCategory}
                        onCancel={this.handleCancel}
                    >
                      <Form>
                           <Item>
                              <Input placeholder="请输入需要修改的内容" onChange={this.onNumberChange}/>
                           </Item>
                      </Form>
                    </Modal>

                </Card>

            </div>
        )
    }
}