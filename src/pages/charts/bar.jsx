import React, {Component} from "react";
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react';
/*
* 柱形图
* */
export default class Bar extends Component {

    state ={
        dataxiaoliang:[5, 20, 36, 10, 10, 20],
        datakucun:[6, 10, 25, 20, 15, 10]
    }

    updata = () => {
        this.setState(state => ({
            dataxiaoliang:state.dataxiaoliang.map(xl => xl+1),
            datakucun:state.datakucun.map(kc => kc-1)
        }))
    }
    getOption = (dataxiaoliang,datakucun) => {
        return  {
            title: {
                text: 'ECharts 入门示例'
            },
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
                type: 'bar',
                data: dataxiaoliang
            },{
                name: '库存',
                type: 'bar',
                data: datakucun
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
                <Card title="柱状图">
                    <ReactEcharts option={this.getOption(dataxiaoliang,datakucun)} style = {{height:"500px"}}/>
                </Card>
            </div>
        )
    }
}