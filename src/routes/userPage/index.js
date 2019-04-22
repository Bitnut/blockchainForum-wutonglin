import React, {Component} from 'react'
import { Menu, Layout, Icon, Avatar, List, Divider} from 'antd'
import './index.css';
import { connect } from 'react-redux'
import {fetchVisitData} from '../../redux/actions/visit'
import { Redirect } from 'react-router-dom'
const  SubMenu  = Menu.SubMenu;
const { Content, Sider } = Layout;


// 模拟数据
  
  
const IconText = ({ type, text }) => (
<span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
</span>
);




class userPage extends Component{
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        openKeys: ['sub1'],
        list: [],
        listData: [],
        selfIntro: '',
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    componentDidMount (){
        this.props.dispatch(fetchVisitData(this.props.match.params.id))
        if(this.props.userArticles!==null) {
            setTimeout(() => {
                const articleList = [];
                const article = this.props.userArticles.map(item => {
                    if(item.release_status === 'yes'){
                        return item.post_title
                    }
                })
                article.forEach((item) => {
                    if(typeof(item) !== "undefined") {
                        articleList.push(item)
                    }
                })
                const list = [];
                for (let i = 0; i < this.props.userArticles.length; i++) {
                    if(this.props.userArticles[i].release_status === 'yes') {
                        list.push({
                            title: this.props.userArticles[i].post_title,
                            avatar: this.props.user_avatar,
                            content: this.props.userArticles[i].article_intro,
                            img: this.props.userArticles[i].intro_img,
                            link: 'http://localhost:3000/article/'+this.props.userArticles[i].post_id
                        });
                    }
                }
                this.setState({
                    list: [...articleList],
                    listData: [...list],
                    selfIntro: this.props.selfIntro
                });
                }, 50);
        } else {
            return
        }
        
            
    }
    render(){
        const { isFetching } = this.props
        const isEmpty = this.props.userArticles.length === 0
        if(!this.props.fetchStatus){
            return (<Redirect to="/404" />);
        }
        return( 
            <div className="home-content">
                {isEmpty
                ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                : <div>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} collapsedWidth="0" style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            openKeys={this.state.openKeys}
                            onOpenChange={this.onOpenChange}
                            style={{ width: 200 }}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>动态</span></span>}>
                            <Menu.Item key="1">优化理论</Menu.Item>
                            <Menu.Item key="2">复变函数</Menu.Item>
                            <Menu.Item key="3">数学分析</Menu.Item>
                            <Menu.Item key="4">线性代数</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>热门</span></span>}>
                            <Menu.Item key="5">复杂难题</Menu.Item>
                            <Menu.Item key="6">量子力学</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="7">量子纠缠</Menu.Item>
                                <Menu.Item key="8">全反射</Menu.Item>
                            </SubMenu>
                            </SubMenu>
                            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>最新评论</span></span>}>
                            <Menu.Item key="9">区块链</Menu.Item>
                            <Menu.Item key="10">区块链</Menu.Item>
                            <Menu.Item key="11">区块链</Menu.Item>
                            <Menu.Item key="12">区块链</Menu.Item>
                            </SubMenu>
                        </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280, overflow: 'hidden' }}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            style={{ width: 1000 }}
                            pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 5,
                            }}
                            dataSource={this.state.listData}
                            footer={<div><b>区块链知识</b> 分享论坛</div>}
                            renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                                extra={item.img === ''
                                ? <div></div>:<img width={272} height={200} alt="logo" src={item.img} />
                                }
                            >
                                <List.Item.Meta
                                title={<a href={item.link}>{item.title}</a>}
                                description={item.description}
                                />
                                {item.content}
                            </List.Item>
                            )}
                        />
                        </Content>
                        <Sider width={350} collapsedWidth="0" style={{ background: '#fff', marginRight: '100'}}>
                        

                            <div className='page-sider'>
                            <div ><Avatar size={64} src={this.props.userInfo.user_avatar}></Avatar><h1>{this.props.userInfo.user_name}</h1></div>
                            <p>个人介绍</p>
                            <Divider />
                            <h3>{this.props.userInfo.self_introduction}</h3>
                            <Divider>创作经历</Divider>
                            <p>我的文章：</p>
                            <Divider dashed />
                            <List
                            size="small"
                            dataSource={this.state.list}
                            renderItem={item => (<List.Item>{item}</List.Item>)}
                            />
                            </div>
                        
                        </Sider>
                    </Layout>
                </div>

                }
                
            </div>
                  
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.visitData.isFetching,
        userInfo: state.visitData.userInfo,
        userArticles: state.visitData.userArticles,
        fetchStatus: state.visitData.fetchStatus,
    }
}

export default connect(mapStateToProps)(userPage)