import React, {Component} from 'react'
import { Menu, Layout, Icon, Avatar, List, Divider, Skeleton} from 'antd'
import './personal.css';
import { connect } from 'react-redux'
const  SubMenu  = Menu.SubMenu;
const { Content, Sider } = Layout;

  
const IconText = ({ type, text }) => (
<span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
</span>
);


class Personal extends Component{
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        openKeys: ['sub1'],
        list: [],
        listData: [],
        selfIntro: '',
        articleShow: '',
        actionShow: 'none',
        newsShow: 'none',
        examineShow: 'none'
    };

    onOpenChange = (openKeys) => {
        switch (openKeys.key)
        {
        case '1':
        this.setState({
            nowOpen: '1',
            articleShow: '',
            actionShow: 'none',
            newsShow: 'none',
            examineShow: 'none'
        }) 
        break;
        case '2':
        this.setState({
            nowOpen: '2',
            articleShow: 'none',
            actionShow: '',
            newsShow: 'none',
            examineShow: 'none'
        })
        break;
        case '3':
        this.setState({
            nowOpen: '3',
            articleShow: 'none',
            actionShow: 'none',
            newsShow: '',
            examineShow: 'none'
        })
        break;
        case '4':
        this.setState({
            nowOpen: '4',
            articleShow: 'none',
            actionShow: 'none',
            newsShow: 'none',
            examineShow: ''
        })
        break;
        default:
        this.setState({
            nowOpen: '1',
            articleShow: '',
            actionShow: 'none',
            newsShow: 'none',
            examineShow: 'none'
        })         
        }
    }
    componentDidMount (){
        //const userArticles = JSON.parse(localStorage.getItem('userArticles'))
        //const userInfo = JSON.parse(localStorage.getItem('userInfo'))
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
                            link: 'http://localhost:3000/article/'+this.props.userArticles[i].post_id,
                            collect: this.props.userArticles[i].post_collects,
                            like: this.props.userArticles[i].post_likes,
                            comments: this.props.userArticles[i].post_comments,
                            views: this.props.userArticles[i].post_views,
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
        const emptyArticleList = this.props.userArticles.length===0
        return(
            <div className="home-content">
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} collapsedWidth="0" style={{ background: '#fff' }}>
                    <Menu  
                            mode="inline"
                            style={{ width: 200 }}
                            defaultSelectedKeys={['1']}
                            openKeys={this.state.openKeys}
                            onClick={this.onOpenChange}
                        >
                            <Menu.Item key="1">个人文章</Menu.Item>
                            <Menu.Item key="2">个人动态</Menu.Item>
                            <Menu.Item key="3">新消息</Menu.Item>
                            <Menu.Item key="4">文章审核情况</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280, overflow: 'hidden' }}>
                    
                    <div className="personal-articles" style={{display: this.state.articleShow}}>
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
                                actions={[<IconText type="star-o" text={item.collect} />, <IconText type="like-o" text={item.like} />, <IconText type="message" text={item.comments} />, <IconText type="eye" text={item.views} />]}
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
                    </div>
                    <div className="actions-record" style={{display: this.state.actionShow}}></div>
                    <div className="personal-news" style={{display: this.state.newsShow}}></div>
                    <div className="examine-process" style={{display: this.state.examineShow}}></div>
                    

                    </Content>
                    <Sider width={350} collapsedWidth="0" style={{ background: '#fff', marginRight: '100'}}>
                    

                        <div className='page-sider'>
                        <div ><Avatar size={64} src={this.props.user_avatar}></Avatar><h1>{this.props.user_name}</h1></div>
                        <p>个人介绍</p>
                        <Divider />
                        <h3>{this.state.selfIntro}</h3>
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
                  
        )
    }
}

const mapStateToProps = state => {
    return {
        selfIntro: state.user.userInfo.self_introduction,
        userArticles: state.user.userArticles,
        user_avatar: state.user.userInfo.user_avatar,
        user_name: state.user.userInfo.user_name
    }
}

export default connect(mapStateToProps)(Personal)