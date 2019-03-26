import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Layout, BackTop, Modal } from 'antd';
import PageHeader from './components/PageHeader';
import Home  from './routes/Home';
import Selection from './routes/Selection';
import Pool from './routes/Pool';
import Register from './routes/user/register';
import Personal from './routes/user/personal';
import Settings from './routes/user/settings';
import Writing from './routes/user/writing';
import './App.css';
import { userInfo } from 'os';



const { Content, Footer } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      isLoggedIn: false,
      login_display: '',
      logout_display: 'none',
      header_display: '',
      userInfo: {},
    };
  }
  handleLogin = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.setState({
      isLoggedIn: true,
      login_display: 'none',
      logout_display: '',
      userInfo: userInfo,
    })
    console.log(this.state.userInfo)
  }
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      login_display: '',
      logout_display: 'none'
    })
  }
  handleWriting = () => {
    this.setState({
      header_display: 'none'
    })
    localStorage.setItem('isWriting', 'true')
    console.log(this.state.header_display)
  }
  handleExitWriting = () => {
    this.setState({
      header_display: ''
    })
    localStorage.setItem('isWriting', 'false')
  }
  componentWillMount() {
    if(localStorage.getItem('isWriting')!=='false') {
      this.setState({
        header_display: 'none',
      });
    }
    if(localStorage.getItem('userInfo')!==null){
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.setState({
        isLoggedIn: true,
        login_display: 'none',
        logout_display: '',
        userInfo: userInfo
      });
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
        <div style={{display: this.state.header_display}}> 
          <Route render={(props) => 
          <PageHeader onLoggedIn={this.handleLogin} onLogout={this.handleLogout} 
          login_display={this.state.login_display} logout_display={this.state.logout_display} 
          onWriting={this.handleWriting} {...props}/>}/>
        </div>
      <Content>
        <Layout>
          <Content style={{ minHeight: 280 }}>
          <Route exact path="/" component={Home}/>
          <Route exact path="/selection" component={Selection}/>
          <Route exact path="/pool" component={Pool}/>
          <Route exact path="/user/register" render={(props) => <Register onIsLoggedInChange={this.handleLogin} {...props}/>}/>
          <Route exact path="/user/personal" component={Personal}/>
          <Route exact path="/user/settings" render={(props) => <Settings userInfo={this.state.userInfo} {...props}/>}/>
          <Route exact path="/user/writing" render={(props) => <Writing exitWriting={this.handleExitWriting} userInfo={this.state.userInfo} {...props}/>}/>
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
