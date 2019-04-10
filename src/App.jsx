import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import { Layout, BackTop, Modal } from 'antd';
import Header from './components/PageHeader';
import Home  from './routes/Home';
import Selection from './routes/Selection';
import Pool from './routes/Pool';
import Register from './routes/user/register';
import Personal from './routes/user/personal';
import Settings from './routes/user/settings';
import Writing from './routes/user/writing';
import hotArticle from './routes/HotArticle';
import raedArticle from './routes/Article';
import { connect } from 'react-redux'
import { skipLoginByToken } from './redux/actions/userAction'

const { Content} = Layout;
//路由配置！
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        hasError: false,
        };
    }
    componentDidMount(){
        console.log(localStorage.getItem('userInfo'))
        console.log(localStorage.getItem('Forum-token'))
        if(localStorage.getItem('userInfo')!==null){
            this.props.dispatch(skipLoginByToken());
        }
    }
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        
    }
    render() {
        if (this.state.hasError) {
        // You can render any custom fallback UI
        Modal.info({
            title: '您的网络似乎有问题',
            content: (
            <div>
                <p style={{marginTop: '20px'}}>抱歉</p>
                <p>网络通信有点捉襟见肘，立即刷新试试！</p>
            </div>
            ),
            onOk() {
                window.location.href = '/';
            },
        });
        return <h1>出错啦</h1>;
        } 
        return (
        <Layout>
            <Route component={Header} />
        <Content>
            <Layout>
            <Content style={{ minHeight: 280 }}>
            <Route exact path="/" component={Home}/>
            <Route exact path="/selection" component={Selection}/>
            <Route exact path="/pool" component={Pool}/>
            <Route exact path="/user/register" component={Register}/>
            <Route exact path="/user/personal" component={Personal}/>
            <Route exact path="/user/settings" component={Settings} />
            <Route exact path="/user/writing" component={Writing} />
            <Route path="/articles" component={hotArticle}/>
            <Route exact path="/article/:id" component={raedArticle}/>
            </Content>
            </Layout>
        </Content>
        <BackTop />
        </Layout>       
        );
    }
}

export default withRouter(connect()(App));
