import React, { Component } from 'react';
import logo from '../../assets/banner.jpg';
import { Layout, Input, Menu, Divider, Button, Icon } from 'antd';
import './index.css';
import {
    Link
  } from 'react-router-dom'
const  Search = Input.Search;
const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class  PageHeader extends Component{
    state = {
        defaultSelectedKeys: ['1'],
        user: {},
        login_display: this.props.login_display,
        logout_display: this.props.logout_display,
        size: 'large',
    }
    handleLogout = () => {
        this.props.onLogout(false);
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
        console.log(this.state.login_display, this.state.logout_display)
    }
    render(){
        const size = this.state.size;
        return(
            <Header className="page-header">
                <div className="header-box">
                    <a className="header-logo" href="/">
                    <img src={logo} alt="logo"/>
                    <span>区块链知识分享论坛</span>
                    </a>
                    <div className={"header-menu"}>
                    <Menu
                    theme="light"
                    className="header-menu"
                    mode="horizontal"
                    defaultSelectedKeys={this.state.defaultSelectedKeys}
                    style={{ lineHeight: '62px' }}
                    >
                    <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/selection">分类</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/pool">奖励池</Link></Menu.Item>
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
                        <MenuItemGroup title="Item 1">
                            <Menu.Item key="setting:1">Option 1</Menu.Item>
                            <Menu.Item key="setting:2">Option 2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="Item 2">
                            <Menu.Item key="setting:3">Option 3</Menu.Item>
                            <Menu.Item key="setting:4">Option 4</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
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
                                <Button ghost className={"login-btn"} size={size}><Link to="/user/login">登录</Link></Button>
                                <Divider type="vertical" style={{margin: "auto 8px"}}/>
                                <Button className={"login-btn"} shape="round" size={size}><Link to="/user/register">注册</Link></Button>
                            </div>
                            <div className={"header-logout"} style={{display: this.state.logout_display}}>
                                <Button ghost shape="round" className={"logout-btn"} size={size}><Link to="/user/personal">你好,欢迎！</Link></Button>
                                <Divider type="vertical" style={{margin: "auto 8px"}}/>
                                <Button ghost shape="round" className={"logout-btn"} size={size} onClick={this.handleLogout}><Link to="/">退出登录</Link></Button>
                            </div>
                        </div>
                    </div>
                </div>
          </Header>            
        )
    }
}