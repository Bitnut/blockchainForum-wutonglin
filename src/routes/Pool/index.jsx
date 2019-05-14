import React, {Component} from 'react'
import { Layout, Avatar, List, Menu} from 'antd'
import { Sparklines, SparklinesLine, SparklinesBars  } from 'react-sparklines';

import avatar from '../../assets/smallBanner.jpg'
import './index.css';
const { Content} = Layout;

const sampleData100 = [0,0,0,0,0,1,1,10,6,5,1,5,1,1,1,5,5,6,16,10,16,10,15,19,20,50,30,40,35,30,45]


const listData = [];
for (let i = 308; i < 390; i++) {
    listData.push({
    title: `fake user0${i}`,
    avatar: avatar,
    description: '10xp rewarded',
    content: '10xp rewarded'
    });
}

export default class Pool extends Component{
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
                                dataSource={listData}
                                footer={<div><b>ant design</b> footer part</div>}
                                renderItem={item => (
                                <List.Item
                                    key={item.title}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    />
                                    <div>{item.content}</div>
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
                                dataSource={listData}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    title={item.title}
                                    description={item.content}
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