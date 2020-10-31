import React, {Component} from "react";
import { Card , Input ,Form,InputNumber, Button,DatePicker,Cascader,Upload, message} from 'antd';
import { ArrowLeftOutlined , HeartTwoTone,LoadingOutlined, PlusOutlined} from '@ant-design/icons';

const { TextArea } = Input;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '',
};
//上传图片配置
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


export default class ProductUpdate extends Component {
    state = {
        loading: false,
    };


    render() {
        const title=(
            <span>
                <a onClick={() => {this.props.history.push("/product")}} style={{marginRight:20}}><ArrowLeftOutlined /></a>
                添加商品
            </span>
        )
        const { loading } = this.state;
        const uploadButton = (
            <div>
                {<PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        const onFinish = values => {
            this.props.history.push("/product",values)
        };

        return (
            <Card title={title} style={{ width: "100%"}}>
                <Form style={{width:"40%"}} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name="name" label="商品名称" rules={[{ required: true , message: '必填项不能为空'}]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="miaoshu" label="商品描述" rules={[{ required: true, message: '必填项不能为空' }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item name="jiage" label="商品价格" rules={[{ required: true , message: '必填项不能为空'}]} style={{width:"70%"}} help="单位:元">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name="replace" label="商品分类" rules={[{ required: true, message: '必填项不能为空' }]} >
                        <Cascader
                            options={[
                                {
                                    value: '食品',
                                    label: '食品',
                                    children: [
                                        {
                                            value: '肉食',
                                            label: '肉食',
                                            children:[
                                                {
                                                    value: '牛肉',
                                                    label: '牛肉',
                                                },
                                                {
                                                    value: '猪肉',
                                                    label: '猪肉',
                                                },
                                                {
                                                    value: '狗肉',
                                                    label: '狗肉',
                                                }
                                            ]
                                        },
                                        {
                                            value: '蔬菜',
                                            label: '蔬菜',
                                            children:[
                                                {
                                                    value: '土豆',
                                                    label: '土豆',
                                                },
                                                {
                                                    value: '白菜',
                                                    label: '白菜',
                                                },
                                                {
                                                    value: '萝卜',
                                                    label: '萝卜',
                                                },
                                            ]
                                        },
                                    ],
                                },
                                {
                                    value: '玩具',
                                    label: '玩具',
                                    children: [
                                        {
                                            value: '飞机',
                                            label: '飞机',
                                            children:[
                                                {
                                                    value: '牛肉',
                                                    label: '牛肉',
                                                },
                                                {
                                                    value: '猪肉',
                                                    label: '猪肉',
                                                },
                                                {
                                                    value: '狗肉',
                                                    label: '狗肉',
                                                }
                                            ]
                                        },
                                        {
                                            value: '汽车',
                                            label: '汽车',
                                            children:[
                                                {
                                                    value: '土豆',
                                                    label: '土豆',
                                                },
                                                {
                                                    value: '白菜',
                                                    label: '白菜',
                                                },
                                                {
                                                    value: '萝卜',
                                                    label: '萝卜',
                                                },
                                            ]
                                        },
                                    ],
                                },
                                {
                                    value: '家具',
                                    label: '家具',
                                    children: [
                                        {
                                            value: '桌子',
                                            label: '桌子',
                                            children:[
                                                {
                                                    value: '牛肉',
                                                    label: '牛肉',
                                                },
                                                {
                                                    value: '猪肉',
                                                    label: '猪肉',
                                                },
                                                {
                                                    value: '狗肉',
                                                    label: '狗肉',
                                                }
                                            ]
                                        },
                                        {
                                            value: '椅子',
                                            label: '椅子',
                                            children:[
                                                {
                                                    value: '土豆',
                                                    label: '土豆',
                                                },
                                                {
                                                    value: '白菜',
                                                    label: '白菜',
                                                },
                                                {
                                                    value: '萝卜',
                                                    label: '萝卜',
                                                },
                                            ]
                                        },
                                    ],
                                },
                            ]} placeholder="请选择分类"
                        />
                    </Form.Item>
                    <Form.Item name="image" label="商品图片" style={{paddingLeft:10}}>
                        <Upload
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}