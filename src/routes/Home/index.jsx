import React, { PureComponent } from 'react';
import {  Col, Row ,Skeleton ,Empty } from 'antd';
import {connect} from 'react-redux'
import { fetchHomeData } from '../../redux/actions/homeData'
import CoverCard from '../../components/Card/CoverCard';
import IntroCard from '../../components/Card/IntroCard';
import ReadCard from '../../components/Card/ReadCard';


class Home extends PureComponent{
    state = {
        loading: "true",
    };

    componentDidMount () {
        this.props.dispatch(fetchHomeData())
    }
    render(){
        const { isFetching } = this.props
        const isEmpty = this.props.hotArticles.length === 0
        const noUsers = this.props.hotUsers.length ===0
        return (
            <div className="App-content" style={{minHeight: 900}}>
            {isEmpty
            ? (isFetching ? <Skeleton active /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{height: 200}} description={
                <span>
                  这里空空如也
                </span>
              }/>):
                <div>
                    {/* 头条*/}
                    <Row style={{marginBottom: 15}} type="flex" justify="center">  
                    <Col span={16}>
                        <IntroCard grid ={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2}}
                        loading={this.state.loading} data={this.props.hotArticles}/> 
                    </Col>
                    </Row>
                </div>
            }
            {noUsers
            ? (isFetching ? <Skeleton active /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{height: 200}} description={
                <span>
                  这里空空如也
                </span>
              }/>):
                <div>
                    {/*活跃用户推荐*/}           
                    <Row style={{marginBottom: 15}} type="flex" justify="center">          
                    <Col span={16}>
                    <CoverCard grid ={{ gutter: 16, xs: 3, sm: 3, md: 6, lg: 6, xl: 6, xxl: 6}}
                        loading={this.state.loading} data={this.props.hotUsers}/> 
                    </Col>
                    </Row>
                </div> 
            }
            {isEmpty
            ? (isFetching ? <Skeleton active /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{height: 200}} description={
                <span>
                  这里空空如也
                </span>
              }/>):
                <div>
                    {/* 浏览帖子*/}  
                    <Row style={{marginBottom: 15}} type="flex" justify="center">          
                    <Col span={16}>
                    <ReadCard grid ={{ gutter: 16, xs: 3, sm: 3, md: 6, lg: 6, xl: 6, xxl: 6}}
                        loading={this.state.loading}  data={this.props.hotArticles}/> 
                    </Col>
                    </Row> 

                </div>     
            }
            }                                                                                 
            </div>                      
        )
    }
}

const mapStateToProps = state => {
    const {homeData} = state
    return {
        isFetching: homeData.isFetching,
        hotArticles: homeData.hotArticles,
        hotUsers: homeData.hotUsers,
        lastUpdated: homeData.lastUpdated
    }
}


export default connect(mapStateToProps)(Home)