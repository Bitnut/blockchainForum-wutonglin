import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Layout, BackTop, Modal } from 'antd';
import PageHeader from './components/PageHeader';
import Home  from './routes/Home';
import Selection from './routes/Selection';
import Pool from './routes/Pool';
import Login from './routes/user/login';
import Register from './routes/user/register';
import Personal from './routes/user/personal';
import './App.css';



const { Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      isLoggedIn: false,
      login_display: 'block',
      logout_display: 'none'
    };
  }
  handleLogin = (isLoggedIn) => {
    this.setState({
      isLoggedIn: isLoggedIn,
      login_display: 'none',
      logout_display: 'block'
    })
  }
  handleLogout = (isLoggedIn) => {
    this.setState({
      isLoggedIn: isLoggedIn,
      login_display: 'block',
      logout_display: 'none'
    })
    sessionStorage.clear();
    console.log(sessionStorage.getItem('Forum-token'))
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
        <Route render={(props) => <PageHeader onLogout={this.handleLogout} login_display={this.state.login_display} logout_display={this.state.logout_display} {...props}/>}/>
      <Content>
        <Layout>
          <Content style={{ minHeight: 280 }}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/selection" component={Selection}/>
          <Route exact path="/pool" component={Pool}/>
          <Route exact path="/user/login" render={(props) => <Login onIsLoggedInChange={this.handleLogin} {...props}/>}/>
          <Route exact path="/user/register" render={(props) => <Register onIsLoggedInChange={this.handleLogin} {...props}/>}/>
          <Route exact path="/user/personal" component={Personal}/>
            {/*
            <Route path="/Info/:bookId" component={Info}/>
            <Route path="/Read/:chapterId" component={Read}/>
            
            <Route path="/Search/:search" component={Search}/> 
             */}
          </Content>
        </Layout>
      </Content>
      <BackTop />
      <Footer style={{ textAlign: 'center' }}>
      </Footer>
    </Layout>       
    );
  }
}

export default App;
