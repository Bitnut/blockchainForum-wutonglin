import React, {Component} from 'react'
import { Layout, Avatar, List, Menu, Icon} from 'antd'
import { Sparklines, SparklinesLine, SparklinesBars  } from 'react-sparklines';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './index.css';
const { Content} = Layout;

const sampleData100 = [0,0,0,0,0,1,1,10,6,5,1,5,1,1,1,5,5,6,16,10,16,10,15,19,20,50,30,40,35,30,45]

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class Pool extends Component{
    state = {
        current: '1',
        poolShow: '',
        bestShow: 'none',
    };
    
    handleClick = (e) => {
        switch (e.key)
        {
            case '1':
            this.setState({
                current: e.key,
                poolShow: '',
                bestShow: 'none',
            }) 
            break;
            case '2':
            this.setState({
                current: e.key,
                poolShow: 'none',
                bestShow: '',
            })
            break;
            default:
            this.setState({
                current: e.key,
                poolShow: '',
                bestShow: 'none',
            }) 
            break;
        }
    }
    render(){
        return(
            <div>
                
                <div className="pool-content">
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Content style={{ padding: '0 24px', minHeight: 300, overflow: 'hidden' }}>
                        <Menu  
                            mode="horizontal"
                            style={{ width: 1000 }}
                            defaultSelectedKeys={['1']}
                            openKeys={[this.state.current]}
                            onClick={this.handleClick}
                            >
                                <Menu.Item key="1">资金池</Menu.Item>
                                <Menu.Item key="2">最佳排名</Menu.Item>
                            </Menu>
                        <div className="money-pool" style={{display: this.state.poolShow}}>
                            <Sparklines data={sampleData100} limit={20}>
                                <SparklinesBars style={{ fill: "#FFA500", fillOpacity: ".25" }} />
                                <SparklinesLine style={{ stroke: "#FFA500", fill: "none" }} />
                            </Sparklines>
                            <List
                                grid={{ gutter: 16, column: 4 }}
                                itemLayout="vertical"
                                size="small"
                                pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 16,
                                }}
                                dataSource={this.props.hotUsers}
                                footer={<div><b>区块链</b> 知识分享论坛</div>}
                                renderItem={item => (
                                <List.Item
                                    key={item.user_name}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={item.user_avatar} />}
                                    title={<Link to={'/u/'+item.user_id}>{item.user_name}</Link>}
                                    />
                                    <div>注册时间：{item.signup_moment}</div>
                                </List.Item>
                                )}
                            />
                        </div>
                        <div className="best-rank" style={{display: this.state.bestShow}}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                bordered
                                style={{ width: 1000 }}
                                pagination={{
                                pageSize: 10,
                                }}
                                dataSource={this.props.hotArticles}
                                renderItem={item => (
                                <List.Item
                                actions={[<IconText type="star-o" text={item.post_collects} />, <IconText type="like-o" text={item.post_likes} />, <IconText type="message" text={item.post_comments} />, <IconText type="eye" text={item.post_views} />]}
                                >
                                    <List.Item.Meta
                                    title={<Link to={'/article/'+item.post_id}>{item.post_title}</Link>}
                                    description={item.article_intro}
                                    />
                                </List.Item>
                                )}
                            />   
                        </div>
                    </Content>
                </Layout>      
                </div>
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
    }
}


export default connect(mapStateToProps)(Pool)