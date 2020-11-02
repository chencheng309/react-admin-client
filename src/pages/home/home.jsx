import React, {Component} from "react";
import './home.less'
import { Card , Statistic , Row, Col , DatePicker,Timeline } from "antd";
import { Chart, Line, Point , G2, Tooltip , Interval } from 'bizcharts';
import { QuestionOutlined  , ArrowUpOutlined, ArrowDownOutlined ,RedoOutlined} from '@ant-design/icons';

const { RangePicker } = DatePicker;
/*
*
* 首页路由
*
* */
/*
* 上方右侧折线图
* */
const dataright = [
    {
        month: "Jan",
        city: "Tokyo",
        temperature: 7
    },
    {
        month: "Jan",
        city: "London",
        temperature: 3.9
    },
    {
        month: "Feb",
        city: "Tokyo",
        temperature: 6.9
    },
    {
        month: "Feb",
        city: "London",
        temperature: 4.2
    },
    {
        month: "Mar",
        city: "Tokyo",
        temperature: 9.5
    },
    {
        month: "Mar",
        city: "London",
        temperature: 5.7
    },
    {
        month: "Apr",
        city: "Tokyo",
        temperature: 14.5
    },
    {
        month: "Apr",
        city: "London",
        temperature: 8.5
    },
    {
        month: "May",
        city: "Tokyo",
        temperature: 18.4
    },
    {
        month: "May",
        city: "London",
        temperature: 11.9
    },
    {
        month: "Jun",
        city: "Tokyo",
        temperature: 21.5
    },
    {
        month: "Jun",
        city: "London",
        temperature: 15.2
    },
    {
        month: "Jul",
        city: "Tokyo",
        temperature: 25.2
    },
    {
        month: "Jul",
        city: "London",
        temperature: 17
    },
    {
        month: "Aug",
        city: "Tokyo",
        temperature: 26.5
    },
    {
        month: "Aug",
        city: "London",
        temperature: 16.6
    },
    {
        month: "Sep",
        city: "Tokyo",
        temperature: 23.3
    },
    {
        month: "Sep",
        city: "London",
        temperature: 14.2
    },
    {
        month: "Oct",
        city: "Tokyo",
        temperature: 18.3
    },
    {
        month: "Oct",
        city: "London",
        temperature: 10.3
    },
    {
        month: "Nov",
        city: "Tokyo",
        temperature: 13.9
    },
    {
        month: "Nov",
        city: "London",
        temperature: 6.6
    },
    {
        month: "Dec",
        city: "Tokyo",
        temperature: 9.6
    },
    {
        month: "Dec",
        city: "London",
        temperature: 4.8
    }
]; //数据源
function LineRight() {
    return <Chart scale={{temperature: {min: 0}}} padding={[30,20,50,40]} autoFit height={250} data={dataright} >
        <Line shape="smooth" position="month*temperature" color="city" label="temperature"/>
        <Point position="month*temperature" color="city" />
    </Chart>
}
/*
* 下方左侧柱形图
* */
const dataleft = [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
];
function Grouped() {
    return (
        <Chart height={300} padding="auto" data={dataleft} autoFit>
            <Interval
                adjust={[
                    {
                        type: 'dodge',
                        marginRatio: 0,
                    },
                ]}
                color="name"
                position="月份*月均降雨量"
            />
            <Tooltip shared />
        </Chart>
    );
}
export default class Home extends Component {



    render() {

        //右侧的日期
        const extra=(
            <RangePicker
                dateRender={current => {
                    const style = {};
                    if (current.date() === 1) {
                        style.border = '1px solid #1890ff';
                        style.borderRadius = '50%';
                    }
                    return (
                        <div className="ant-picker-cell-inner" style={style}>
                            {current.date()}
                        </div>
                    );
                }}
            />
        )
        return (
            <div className="home">
                <div className="head">
                    <div className="headleft">
                    <Card title={"商品总量"} extra={<QuestionOutlined />}>

                                <Statistic value={1128163} suffix="个"/>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Statistic title="周同比" value="15%" suffix={<ArrowUpOutlined />}  valueStyle={{ color: '#3f8600' }}/>
                            </Col>
                            <Col span={12}>
                                <Statistic title="日同比" value="10%" suffix={<ArrowDownOutlined />} valueStyle={{ color: '#cf1322' }}/>
                            </Col>
                        </Row>
                    </Card>
                    </div>
                    <div className="headright">
                    <LineRight />
                    </div>
                </div>
                <div className="secend">
                    <div className="card">
                        <Card title={<span style={{fontSize:20}}> 访问量 </span>} extra={extra}>
                            <div className="cardhome">
                                <div className="cardhome-left">
                                    <Card title="访问趋势" extra={<RedoOutlined />}>
                                        <Grouped/>
                                    </Card>
                                </div>
                                <div className="cardhome-right">
                                    <Card title="任务" extra={<RedoOutlined />}>
                                        <Timeline>
                                            <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                                            <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                                            <Timeline.Item color="red">
                                                <p>联接接口</p>
                                                <p>功能验收</p>
                                            </Timeline.Item>
                                            <Timeline.Item color="green">
                                                <p>登录功能设计</p>
                                                <p>权限验证</p>
                                                <p>页面排版</p>
                                            </Timeline.Item>
                                        </Timeline>,
                                    </Card>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}