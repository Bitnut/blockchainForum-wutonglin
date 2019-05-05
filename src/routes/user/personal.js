import React, {Component} from 'react'
import { Menu, Layout, Icon, Avatar, List, 
    Divider, Skeleton, Steps, Button, message } from 'antd'
import './personal.css';
import { connect } from 'react-redux'
import {fetchUserData} from '../../redux/actions/userAction'
const { Content, Sider } = Layout;
const Step = Steps.Step;
  
const steps = [{
    title: '文章投稿',
    content: '文章已经投稿，正在等待管理员接收',
}, {
    title: '文章审核',
    content: '管理员已经接收文章，文章正在审核中',
}, {
    title: '存入区块链，生成存证',
    content: '文章审核已通过，正在等待区块链生成存储证明',
}, {
    title: '投稿完成',
    content: '文章已通过所有流程，完成投稿过程',
}];

const stepList = []

for(var i = 1; i < 11; i++) {
    stepList.push({
        content: steps,
        title: 'new article '+ i
    })
}


const IconText = ({ type, text }) => (
<span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
</span>
);

function listSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j].created_at > arr[j+1].created_at) {        //相邻元素两两对比
                var temp = arr[j+1];        //元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

class Personal extends Component{
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        openKeys: ['sub1'],
        list: [],
        listData: [],
        actionList: [],
        newsList: [],
        selfIntro: '',
        articleShow: '',
        actionShow: 'none',
        newsShow: 'none',
        examineShow: 'none',
        current: 0,
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


    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    componentDidMount (){
        // 获取用户个人界面信息
        this.props.dispatch(fetchUserData())
        // 文章展示初始化
        setTimeout(() => {
            if (this.props.userArticles.length === 0) {
                return
            }
            const articleList = [];
            const list = [];
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
            
            // 抽出用户的个人动态和用户收到的消息
            const user_id = this.props.user_id.toString()
            const user_likes= this.props.user_likes
            const user_collects= this.props.user_collects
            const user_follows= this.props.user_follows
            var tempAction = []
            var tempNews = []
            // 点赞未做更新处理！！[bug]，取消点赞收藏信息视为未取消
            user_likes.forEach((item)=>{
                if (item.user_id === user_id) {
                    tempAction.push({
                        title: '点赞操作',
                        description: '你点赞了用户 '+ item.author_id+' 的文章： '+ item.post_title,
                        created_at: item.created_at,
                        link: 'http://localhost:3000/article/'+item.post_id,
                    })
                } else {
                    tempNews.push({
                        title: '点赞操作',
                        description: '用户 '+item.user_id+' 点赞了你的文章： '+ item.post_title,
                        created_at: item.created_at,
                        link: 'http://localhost:3000/article/'+item.post_id,
                    })
                }
            })
            user_collects.forEach((item)=>{
                if (item.user_id === user_id) {
                    tempAction.push({
                        title: '收藏操作',
                        description: '你收藏了用户 '+ item.author_id+' 的文章： '+ item.post_title,
                        created_at: item.created_at,
                        link: 'http://localhost:3000/article/'+item.post_id,
                    })
                } else {
                    tempNews.push({
                        title: '收藏操作',
                        description: '用户 '+item.user_id+' 收藏了你的文章： '+ item.post_title,
                        created_at: item.created_at,
                        link: 'http://localhost:3000/article/'+item.post_id,
                    })
                }
            })
            user_follows.forEach((item)=>{
                if (item.user_id === user_id) {
                    tempAction.push({
                        title: '关注操作',
                        description: '你关注了用户 '+ item.followed_user_id,
                        created_at: item.created_at,
                        link: 'http://localhost:3000/u/'+item.followed_user_id,
                    })
                } else {
                    tempNews.push({
                        title: '关注操作',
                        description: '用户 '+ item.user_name +'关注了你',
                        created_at: item.created_at,
                        link: 'http://localhost:3000/u/'+item.user_id,
                    })
                }
            })
            // 做排序
            listSort(tempAction)
            listSort(tempNews)
            this.setState({
                actionList: [...tempAction], 
                newsList: [...tempNews],
                list: [...articleList],
                listData: [...list],
                selfIntro: this.props.selfIntro
            })
        }, 100)
        
    }
    render(){
        const isEmpty = this.props.userArticles.length === 0;
        const isFetching = this.props.isFetching
        const { current } = this.state;
        return(
            <div className="home-content">
            {isEmpty
                ? (isFetching ? <Skeleton active /> : <h2>Empty.</h2>):
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
                    <div className="actions-record" style={{display: this.state.actionShow}}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            bordered
                            style={{ width: 1000 }}
                            pagination={{
                            pageSize: 10,
                            }}
                            dataSource={this.state.actionList}
                            footer={<div><b>区块链知识</b> 分享论坛</div>}
                            renderItem={item => (
                            <List.Item
                            actions={[item.created_at]}>
                                <List.Item.Meta
                                title={item.title}
                                description={<a href={item.link}>{item.description}</a>}
                                />
                            </List.Item>
                            )}
                        />                
                    </div>
                    <div className="personal-news" style={{display: this.state.newsShow}}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            bordered
                            style={{ width: 1000 }}
                            pagination={{
                            pageSize: 10,
                            }}
                            dataSource={this.state.newsList}
                            footer={<div><b>区块链知识</b> 分享论坛</div>}
                            renderItem={item => (
                            <List.Item
                            actions={[item.created_at]}>
                                <List.Item.Meta
                                title={item.title}
                                description={<a href={item.link}>{item.description}</a>}
                                />
                            </List.Item>
                            )}
                        />   
                    </div>
                    <div className="examine-process" style={{display: this.state.examineShow}}>
                        <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title} />)}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                        <div className="steps-action">
                        {
                            current < steps.length - 1
                            && <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                            current === steps.length - 1
                            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                        }
                        {
                            current > 0
                            && (
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                            </Button>
                            )
                        }
                        </div>
                        <List
                            itemLayout="vertical"
                            size="large"
                            style={{ width: 1000 }}
                            pagination={{
                            pageSize: 6,
                            }}
                            dataSource={stepList}
                            footer={<div><b>区块链知识</b> 分享论坛</div>}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                title={item.title}
                                description={
                                    <Steps current={4}>
                                        {item.content.map((i) => <Step key={i.title} title={i.title} />)}
                                    </Steps>
                                }
                                />
                            </List.Item>
                            )}
                        />   
                        
                    </div>
                    

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
                }
                
            </div>
                  
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.user.isLoggingin,
        selfIntro: state.user.userInfo.self_introduction,
        user_id: state.user.userInfo.user_id,
        userArticles: state.user.userArticles,
        user_likes: state.user.user_likes,
        user_collects: state.user.user_likes,
        user_follows: state.user.user_follows,
        user_avatar: state.user.userInfo.user_avatar,
        user_name: state.user.userInfo.user_name
    }
}

export default connect(mapStateToProps)(Personal)