import React, {Component} from 'react'
import { Menu, Layout, Icon, Avatar, List, Divider} from 'antd'
import './personal.css';
import avatar from '../../assets/smallBanner.jpg'
import { connect } from 'react-redux'
const  SubMenu  = Menu.SubMenu;
const { Content, Sider } = Layout;


// 模拟数据
  
  
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
        listData: []
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
        const userArticles = JSON.parse(localStorage.getItem('userArticles')) 
        if(userArticles!==null) {
            setTimeout(() => {
                const articleList = [];
                const article = userArticles.map(item => {return item.post_title})
                article.forEach((item, index) => {
                    articleList.push(item)
                })
                const list = [];
                var abstract = '';
                for (let i = 0; i < userArticles.length; i++) {
                    var temp = userArticles[i].post_content_html.substring(0,200)
                    abstract = temp.replace(/<\/?.+?>/g,"");
                    const newContent = abstract.replace(/ /g,"");
                    list.push({
                        title: userArticles[i].post_title,
                        avatar: avatar,
                        content: newContent,
                    });
                }
                this.setState({
                    list: [...articleList],
                    listData: [...list],
                });
                }, 50);
        } else {
            return
        }
        
            
    }
    render(){
        return( 
            <div className="home-content">
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} collapsedWidth="0" style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        style={{ width: 200 }}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>数学</span></span>}>
                        <Menu.Item key="1">优化理论</Menu.Item>
                        <Menu.Item key="2">复变函数</Menu.Item>
                        <Menu.Item key="3">数学分析</Menu.Item>
                        <Menu.Item key="4">线性代数</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>物理</span></span>}>
                        <Menu.Item key="5">复杂难题</Menu.Item>
                        <Menu.Item key="6">量子力学</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">量子纠缠</Menu.Item>
                            <Menu.Item key="8">全反射</Menu.Item>
                        </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>热点</span></span>}>
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
                            extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                        >
                            <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                            />
                            {item.content}
                        </List.Item>
                        )}
                    />
                    </Content>
                    <Sider width={350} collapsedWidth="0" style={{ background: '#fff', marginRight: '100'}}>
                    

                        <div className='page-sider'>
                        <p>个人介绍</p>
                        <Divider />
                        <h3>{this.props.selfIntro}</h3>
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
    }
}

export default connect(mapStateToProps)(Personal)