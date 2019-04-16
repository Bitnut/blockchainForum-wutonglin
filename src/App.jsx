import React, { Component } from 'react';
import {withRouter, Route,Redirect, Switch } from 'react-router-dom'
import { Layout, Modal } from 'antd';
import Header from './components/PageHeader';
/*
import Home  from './routes/Home';
import Selection from './routes/Selection';
import Pool from './routes/Pool';
import Register from './routes/user/register';
import Personal from './routes/user/personal';
import Settings from './routes/user/settings';
import Writing from './routes/user/writing';
import hotArticle from './routes/HotArticle';
import raedArticle from './routes/Article';
import Jobs from './routes/Jobs'*/
import ErrorPage from './routes/Error'
import {routerConfig} from './resolveRoute'
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
        const isLogin = localStorage.getItem('Forum-token') ? true :false;
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
            <div>
                <Route component={Header} />
                <Layout >
                    <Content style={{ minHeight: 280 }}>
                            <Switch>
                            {routerConfig.map((item, index) => {
                            return <Route key={index} path={item.path} exact render={props =>
                                (!item.auth ? (<item.component {...props} />) : (isLogin ? <item.component {...props} /> : <Redirect to={{
                                pathname: '/login',
                                state: { from: props.location }
                                }} />)
                                )} />
                            })}
                            <Route component={ErrorPage} />
                            </Switch>
                    </Content>
                </Layout> 
            </div>   
        );
    }
}




export default withRouter(connect()(App));
