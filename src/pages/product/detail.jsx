import React, {Component} from "react";
import { Card , List, Typography, Divider} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import image from "../../assets/images/logo .jpg"
export default class ProductDetail extends Component {

    render() {
        const product = this.props.location.state;
        const title=(
            <span>
                <a onClick={() => {this.props.history.push("/product")}} style={{marginRight:20}}><ArrowLeftOutlined /></a>
                商品详情
            </span>
        )
        const data = [
            <p><span style={{fontSize:18}}>商品名称 : </span><span>{product.name}</span></p>,
            <p><span style={{fontSize:18}}>商品描述 : </span>{product.miaoshu}</p>,
            <p><span style={{fontSize:18}}>商品价格 : </span>{product.jiage}</p>,
            <p><span style={{fontSize:18}}>所属分类 : </span>{product.key}</p>,
            <p><span style={{fontSize:18}}>商品图片 : </span><img src={product.image}/></p>,
            <p><span style={{fontSize:18}}>商品详情 : </span>{product.description}</p>
        ];
        return (
            <Card title={title} style={{ width: "100%" }}>
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            {item}
                        </List.Item>
                    )}
                />
            </Card>

        )
    }
}