import React, { Component } from 'react';
import logo from '../../assets/banner.jpg';
import PropTypes from 'prop-types'
import { Layout, Input, Menu, Divider, Button, 
    Icon, Dropdown, Modal,Row, Col, Badge } from 'antd';
import {
    Link
  } from 'react-router-dom'
import { userLogout, goWriting } from '../../redux/actions/userAction'
import { searchArticle } from '../../redux/actions/search' 
import Login from '../../components/Login'
import Headroom from 'react-headroom'
import { connect } from 'react-redux'
import './index.css'
const  Search = Input.Search;
const {Header} = Layout

class  NewHeader extends Component{
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        login_display: PropTypes.string.isRequired,
        logout_display: PropTypes.string.isRequired,
        header_display: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    state = {
        defaultSelectedKeys: '1',
        size: 'default',
        visible: false,
        confirmLoading: false,
        show: true,

    }
    userMenu = () => (
        <Menu onClick= {this.onLogout} style={{ width: 150, marginTop: 20}}>
            <Menu.Item key="setting:1" style={{height: 40}}><Link to="/user/personal">个人主页<Badge  count={99} style={{marginLeft:24}}></Badge></Link></Menu.Item>
            <Menu.Item key="setting:2" style={{height: 40}}>喜欢的文章<Badge  count={99} style={{marginLeft:10}}></Badge></Menu.Item>
            <Menu.Item key="setting:3" style={{height: 40}}>香囊</Menu.Item>
            <Menu.Item key="setting:4" style={{height: 40}}><Link to="/user/settings">设置</Link></Menu.Item>
            <Menu.Item key="setting:5" style={{height: 40}}>帮助与反馈</Menu.Item>
            <Menu.Item key="setting:6" style={{height: 40}}><Link to="/">退出登录</Link></Menu.Item>
        </Menu>
    );

    handleLogout = () => {
        this.props.dispatch(userLogout());
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
    handleWriting = () => {
        this.props.dispatch(goWriting());
    }
    handleSearch = (data) => {
        if(data === undefined ||  data === null || data.replace(/(^\s*)|(\s*$)/g, "") === ""){
            this.props.dispatch(searchArticle({keyword: '区块链'}))
        } else {
            this.props.dispatch(searchArticle({keyword:data}))
        }
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
        if (this.props.location.pathname === '/user/writing') {
            this.props.dispatch(goWriting())
        }
    }
    render(){
        const size = this.state.size;
        return(
            <Headroom>
                <Header className="page-header" style={{display: this.props.header_display}}>
                    <Row gutter={16} type="flex" justify="center" align="bottom">
                        <Col xs={16} sm={12} md={9} lg={6} xl={3}>
                        <img src={logo} alt="logo" style={{height: 64, padding: 8}}/>
                        <Link to="/">区块链知识分享论坛</Link>
                        </Col>
                        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
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
                        </Col>
                        <Col xs={2} sm={4} md={6} lg={8} xl={8}>
                            <Search
                            className={"header-search"}
                            placeholder="区块链"
                            enterButton={true}
                            onSearch={value => {
                                this.handleSearch(value)
                                this.props.history.push('/search')
                            }}
                            />
                        </Col>
                        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
                            <div className={"header-rightpart"}>
                                <div className={"header-login"} style={{display: this.props.login_display}}>
                                    <Button onClick={this.showModal} size={size} className={"login-btn"}>
                                        登录
                                    </Button>
                                    <Modal
                                    title="Title"
                                    visible={this.state.visible}
                                    footer={null}
                                    onCancel={this.handleCancel}
                                    >
                                    <Login onCancel={this.handleCancel}/>
                                    </Modal>
                                    <Divider type="vertical" style={{margin: "auto 8px"}}/>
                                    <Button className={"login-btn"} shape="round" size={size}><Link to="/register">注册</Link></Button>
                                </div>
                                <div className={"header-logout"} style={{display: this.props.logout_display}}>
                                    <Dropdown overlay={this.userMenu}>
                                        <a className="ant-dropdown-link">
                                        <Badge dot={this.state.show}>你好,欢迎！</Badge><Divider type="vertical" style={{margin: "auto 8px"}}/><Icon type="down" />
                                        
                                        </a>
                                    </Dropdown>
                                    <Divider type="vertical" style={{margin: "auto 16px"}}/>
                                    <Button type="primary" shape="round" className={"writing-btn"} size='large' onClick={this.handleWriting}><Link to="/user/writing">写文章</Link></Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Header>
            </Headroom>                
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        login_display: state.user.login_display,
        logout_display: state.user.logout_display,
        header_display: state.user.header_display,
        login_info: state.user.login_info,
        avatar: state.user.userInfo.user_avatar,
    }
}

export default connect(mapStateToProps)(NewHeader)