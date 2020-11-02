import React, {Component} from "react";
import { withRouter } from 'react-router-dom'
import "./index.less";
import tianqi from "./tianqi.jpg";
import {formateDate} from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import {menulist} from "../../config/menuConfig";
import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
class Index extends Component {

    state ={
        currentTime:formateDate(Date.now()),
    }
    //动态更新时间
    getTime = () =>{
        this.intervalId=setInterval(()=>{
            const currentTime=formateDate(Date.now());
            this.setState({currentTime})
        },1000)
    }
    //动态更新标题
    getTitle = () => {
        //等到当前请求路径
        const path=this.props.location.pathname;
        let title="";
        //匹配当前路径，如果一样则返回title
        menulist.forEach(item=>{
            if(item.key===path){
                title=item.title;
            }
        })
        return title;
    }
    /*
    * 退出登录
    * */
    logout=()=>{
        confirm({
            title: '是否退出系统?',
            icon: <ExclamationCircleOutlined />,
            onOk:()=> {
               //删除保存的user数据
                storageUtils.removeUser();
                memoryUtils.user = {};
                //跳转到login
                this.props.history.replace("/login")
            },

        });
    }

    /*
    * 在render之后执行一次
    * */
    componentDidMount() {
        this.getTime()
    }

    /*
    * 当前组件卸载之前使用
    * */
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalId)
    }


    render() {
        // const username = memoryUtils.user.username;
        const title=this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，admin</span>
                    <a onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{this.state.currentTime}</span>
                        <img src={tianqi} alt="tianqi"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Index)