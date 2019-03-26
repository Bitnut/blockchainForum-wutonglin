import React, { Component } from 'react';
import logo from '../../assets/banner.jpg';
import { Layout, Input, Menu, Divider, Button, 
    Icon, Dropdown,  notification, Modal, Form, Checkbox, } from 'antd';
import './index.css';
import {
    Link
  } from 'react-router-dom'
import Login from '../../components/login'
const  Search = Input.Search;
const {Header} = Layout;


export default class  PageHeader extends Component{
    state = {
        defaultSelectedKeys: ['1'],
        user: {},
        login_display: this.props.login_display,
        logout_display: this.props.logout_display,
        size: 'default',
        visible: false,
        confirmLoading: false,
        header_display: this.props.header_display,
    }
    userMenu = () => (
        <Menu onClick= {this.onLogout}>
            <Menu.Item key="setting:1"><Link to="/user/personal">个人主页</Link></Menu.Item>
            <Menu.Item key="setting:2">喜欢的文章</Menu.Item>
            <Menu.Item key="setting:3">香囊</Menu.Item>
            <Menu.Item key="setting:4"><Link to="/user/settings">设置</Link></Menu.Item>
            <Menu.Item key="setting:5">帮助与反馈</Menu.Item>
            <Menu.Item key="setting:6"><Link to="/">退出登录</Link></Menu.Item>
        </Menu>
    );
    handleLogout = () => {
        this.props.onLogout();
    }
    onLogout = ({ key }) => {
        if(key === 'setting:6'){
            this.handleLogout()
        }   
    };
    // 一些登录对话框的函数
    showModal = () => {
        this.setState({
          visible: true,
        });
    }
    
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
    }
    componentWillMount(){
        if(this.props.location === undefined){
            this.setState({defaultSelectedKeys: ['4']});
            return;
        }
        if(this.props.location.pathname === '/'){
            this.setState({defaultSelectedKeys: ['1']});
        }else if(this.props.location.pathname.indexOf("/Selection") > -1){
            this.setState({defaultSelectedKeys: ['2']});
        }else if(this.props.location.pathname.indexOf("/Info") > -1){
            this.setState({defaultSelectedKeys:['4']});
        }else{
            this.setState({defaultSelectedKeys: ['4']});
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            login_display: nextProps.login_display,
            logout_display: nextProps.logout_display
        })
        //console.log(this.state.login_display, this.state.logout_display)
    }
    render(){
        const size = this.state.size;
        return(
            <Header className="page-header" style={{display: this.state.header_display}}>
                <div className="header-box">
                    <div className="header-logo">
                    <img src={logo} alt="logo"/>
                    <Link to="/">区块链知识分享论坛</Link>
                    </div>
                    <div className={"header-menu"}>
                    <Menu
                    theme="light"
                    className="header-menu"
                    mode="horizontal"
                    defaultSelectedKeys={this.state.defaultSelectedKeys}
                    style={{ lineHeight: '62px' }}
                    >
                    <Menu.Item key="1"><Link to="/">发现</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/selection">关注</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/pool">奖励池</Link></Menu.Item>
                    </Menu>
                    </div>
                    <div className={"header-right"}>
                        <Search
                        className={"header-search"}
                        placeholder="区块链发展过程"
                        enterButton={true}
                        onSearch={value => {
                            if(value === undefined ||  value === null || value.replace(/(^\s*)|(\s*$)/g, "") === ""){
                                this.props.history.push(`/Search/区块链发展过程`);
                                return;
                            }
                            this.props.history.push(`/Search/${value}`); 
                        }}
                        />
                        <div className={"header-rightpart"}>
                            <div className={"header-login"} style={{display: this.state.login_display}}>
                                <Button ghost onClick={this.showModal} size={size} className={"login-btn"}>
                                    登录
                                </Button>
                                <Modal
                                title="Title"
                                visible={this.state.visible}
                                footer={null}
                                onCancel={this.handleCancel}
                                >
                                <Login onIsLoggedInChange={this.props.onLoggedIn} onCancel={this.handleCancel}/>
                                </Modal>
                                <Divider type="vertical" style={{margin: "auto 8px"}}/>
                                <Button className={"login-btn"} shape="round" size={size}><Link to="/user/register">注册</Link></Button>
                            </div>
                            <div className={"header-logout"} style={{display: this.state.logout_display}}>
                                <Dropdown overlay={this.userMenu}>
                                    <a className="ant-dropdown-link">
                                    你好,欢迎！ <Icon type="down" />
                                    </a>
                                </Dropdown>
                                <Divider type="vertical" style={{margin: "auto 8px"}}/>
                                <Button type="primary" shape="round" className={"writing-btn"} size='large' onClick={this.props.onWriting}><Link to="/user/writing">写文章</Link></Button>
                            </div>
                        </div>
                    </div>
                </div>
          </Header>            
        )
    }
}