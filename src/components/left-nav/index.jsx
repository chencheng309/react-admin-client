import React, {Component} from "react";
import "./index.less";
import login from "../../assets/images/logo .jpg"
import {Link} from "react-router-dom";
import { Menu } from 'antd';
import {
    UnorderedListOutlined,
    AppstoreOutlined,
    PieChartOutlined,
    HighlightOutlined,
    UserOutlined,
    SafetyCertificateOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    LineChartOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

/*
* 菜单组件
* */
class Menus extends Component{

    render() {
        return (
            <Menu
                defaultSelectedKeys={['/home']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
            >
                <Menu.Item key="/home" icon={<PieChartOutlined />}>
                    <Link to="/home">首页</Link>
                </Menu.Item>

                <SubMenu key="sub1" icon={<AppstoreOutlined />} title="商品">
                    <Menu.Item key="/category" icon={<UnorderedListOutlined />}>
                        <Link to="/category">品类管理</Link>
                    </Menu.Item>
                    <Menu.Item key="/product" icon={<HighlightOutlined />}>
                        <Link to="/product">商品管理</Link>
                    </Menu.Item>
                </SubMenu>

                <Menu.Item key="/user" icon={<UserOutlined />}>
                    <Link to="/user">用户管理</Link>
                </Menu.Item>

                <Menu.Item key="/role" icon={<SafetyCertificateOutlined />}>
                    <Link to="/role">角色管理</Link>
                </Menu.Item>

                <SubMenu key="sub2" icon={<AreaChartOutlined />} title="图形图表">
                    <Menu.Item key="/charts/bar" icon={<BarChartOutlined />}>
                        <Link to="/charts/bar">柱形图</Link>
                    </Menu.Item>
                    <Menu.Item key="/charts/line" icon={<LineChartOutlined />}>
                        <Link to="/charts/line">折线图</Link>
                    </Menu.Item>
                    <Menu.Item key="/charts/pie" icon={<PieChartOutlined />}>
                        <Link to="/charts/pie">饼图</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    }

}


/*
* 左侧导航组件
* */
export default class Leftnav extends Component {
    render() {
        return (

            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={login} alt="React后台"/>
                    <h1>React后台</h1>
                </Link>
                <Menus/>
            </div>
        )
    }
}