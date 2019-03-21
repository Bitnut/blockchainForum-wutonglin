import React, { PureComponent } from 'react';
import { Card, Col, Row   } from 'antd';
import Banner from '../../components/Banner';
import GridCard from '../../components/Card/GridCard';
import RankCard from '../../components/Card/RankCard';
import CoverCard from '../../components/Card/CoverCard';
import IntroCard from '../../components/Card/IntroCard';
import ReadCard from '../../components/Card/ReadCard';
import coverDefault from '../../assets/default.jpg'
import bannerDefault from '../../assets/timg.jpeg'
import './index.css';


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
          <Row gutter={24} >
              <Col xs={24} sm={24} md={6} lg={5} xl={5}>
                <Row gutter={24} className="home-slide">
                  <GridCard />
                  <Col span={24}  className="book-type" >
                    <RankCard  loading={this.state.loading} rankTypeData={this.state.data[10]} />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={18} lg={19} xl={19}>
                <Row gutter={24} style={{marginBottom: 15}}>
                  <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <Banner loading={this.state.loading} rankTypeData={this.state.data[0]}/>
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{paddingRight: "0"}}>
                    <Card title="大家都在搜" className="hot-search">
                      <a href="/Info/283">Math</a>
                      <a href="/Info/284">English</a>
                      <a href="/Info/290">physics</a>
                      <a href="/Info/281">novel</a>
                      <a href="/Info/255">sport</a>
                    </Card>
                  </Col>
                </Row>
                {/* 头条*/}
                <Row gutter={24} style={{marginBottom: 15, backgroundColor: '#fff'}}>  
                  <Col span={24}>
                    <IntroCard grid ={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2}}
                      loading={this.state.loading} rankTypeData={this.state.data[1]}/> 
                  </Col>
                </Row>
                 {/*精选*/}           
                <Row gutter={24} style={{marginBottom: 15, backgroundColor: '#fff'}}>          
                  <Col span={24}>
                  <CoverCard grid ={{ gutter: 16, xs: 3, sm: 3, md: 6, lg: 6, xl: 6, xxl: 6}}
                      loading={this.state.loading} rankTypeData={this.state.data[2]}/> 
                  </Col>
                </Row>
                 {/* 浏览帖子*/}
                 <Row gutter={24} style={{marginBottom: 15, backgroundColor: '#fff'}}>          
                  <Col span={24}>
                  <ReadCard grid ={{ gutter: 16, xs: 3, sm: 3, md: 6, lg: 6, xl: 6, xxl: 6}}
                      loading={this.state.loading} rankTypeData={this.state.data[2]}/> 
                  </Col>
                </Row>                         
              </Col>
            </Row>                                                        
          </div>                     
        )
    }
}