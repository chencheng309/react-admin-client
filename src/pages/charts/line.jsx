import React, {Component} from "react";
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react';
/*
* 柱形图
* */
export default class Line extends Component {

    state ={
        xiaoliang:[5, 20, 36, 10, 10, 20],
        kucun:[6, 10, 25, 20, 15, 10]
    }

    update = () => {
        this.setState(state => ({
            xiaoliang:state.xiaoliang.map(xl => xl+1),
            kucun:state.kucun.map(kc => kc-1)
        }))
    }
    getOption = () => {
        return  {

            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {
            },
            series: [{
                name: '销量',
                type: 'line',
                data: this.state.xiaoliang
            },{
                name: '库存',
                type: 'line',
                data: this.state.kucun
            }]
        }
    }
    render() {
        const {dataxiaoliang,datakucun} = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>更新</Button>
                </Card>
                <Card title="折线图">
                    <ReactEcharts option={this.getOption()} style = {{height:"500px"}}/>
                </Card>
            </div>
        )
    }
}