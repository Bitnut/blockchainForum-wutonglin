import React, { PureComponent } from 'react';
import { Card, Col, Icon } from 'antd';
import PropTypes from 'prop-types';
import './GridCard.css';

const { Meta } = Card;
const gridStyle = {
    width: '100%',
    padding: '8px',
    textAlign: 'left',
  };

// 
// mock数据
const mock = (count) =>{
    const datas = [];
    for(let i = 0; i < count; i++){
      const tempinfo = {
        typeId: i,
        news: "区块链发展迅猛",
        Count: "666",
        bookCount: "6"
      };
      datas.push(tempinfo)
    }
    return datas;
  }

const tempData = [
    {
        typeName: "math 专区",
        children: []
    }
]


tempData[0].children= mock(10);


const iconArray = ["medium", "dingding", "exception"]


export default class GridCard extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            value: tempData
        }
    }
    render(){
        return (
            <div>
                {
                    this.state.value.map((item, index) => (
                        <Col span={24} className={this.props.className} key={index}>
                            <Card loading={this.state.isLoading} title={<div style={{fontSize: 16, fontWeight: 400}}><Icon type={iconArray[index]} style={{ fontSize: 20,  marginRight: 10, color: '#FFA500'}} />{item.typeName}</div>}>
                                {item.children.map((xitem) => (
                                <div key={xitem.typeId} >
                                    <Card.Grid style={gridStyle} >
                                    <Meta title={xitem.news} /></Card.Grid>
                                </div>
                                ))}
                            </Card>
                        </Col>
                    ))
                }
            </div>
        )
    }

}

GridCard.defaultProps = {
    className: 'book-type',
    typeId : 0
}

GridCard.protoTypes = {
    className: PropTypes.string
}