import React, { PureComponent } from 'react';
import {  Col, Row   } from 'antd';
//import Banner from '../../components/Banner';
//import GridCard from '../../components/Card/GridCard';
//import RankCard from '../../components/Card/RankCard';
import CoverCard from '../../components/Card/CoverCard';
import IntroCard from '../../components/Card/IntroCard';
import ReadCard from '../../components/Card/ReadCard';
import coverDefault from '../../assets/default.jpg'
import bannerDefault from '../../assets/timg.jpeg'


const mock = (count) =>{
  const datas = [];
  for(let i = 0; i < count; i++){
    const tempBook = {
      rankId: "0",
      book: {
        index: i,
        bookId: i,
        banner: bannerDefault,
        bookName: "区块链",
        summary: "区块链分享论坛， 欢迎开发者加入～～～",
        cover: coverDefault,
        clickTimes: 0,
        author: "hpc"
      }
    };
    datas.push(tempBook)
  }
  const rank = {
    typeName: "区块链",
    rankList: datas
  }
  return rank;
}

const mockData = [];
mockData.push(mock(4));
mockData.push(mock(4));
mockData.push(mock(6));
mockData.push(mock(3));
mockData.push(mock(3));
mockData.push(mock(4));
mockData.push(mock(4));
mockData.push(mock(4));
mockData.push(mock(4));
mockData.push(mock(3));
mockData.push(mock(10));


export default class Home extends PureComponent{
  state = {
    data: mockData,
    loading: "true",
  };
  render(){
      return (
          <div className="App-content">
                {/* 头条*/}
                <Row style={{marginBottom: 15}} type="flex" justify="center">  
                  <Col span={16}>
                    <IntroCard grid ={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2}}
                      loading={this.state.loading} rankTypeData={this.state.data[1]}/> 
                  </Col>
                </Row>
                 {/*精选*/}           
                <Row style={{marginBottom: 15}} type="flex" justify="center">          
                  <Col span={16}>
                  <CoverCard grid ={{ gutter: 16, xs: 3, sm: 3, md: 6, lg: 6, xl: 6, xxl: 6}}
                      loading={this.state.loading} rankTypeData={this.state.data[2]}/> 
                  </Col>
                </Row>
                 {/* 浏览帖子*/}
                 <Row style={{marginBottom: 15}} type="flex" justify="center">          
                  <Col span={16}>
                  <ReadCard grid ={{ gutter: 16, xs: 3, sm: 3, md: 6, lg: 6, xl: 6, xxl: 6}}
                      loading={this.state.loading} rankTypeData={this.state.data[2]}/> 
                  </Col>
                </Row>                                                                                
          </div>                     
        )
    }
}