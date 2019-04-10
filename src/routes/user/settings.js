import React, {Component} from 'react'
import { Menu, Layout} from 'antd'
import './settings.css';
import {WrappedBasic, WrappedProfile, WrappedReward} from '../../components/Settings'
import { connect } from 'react-redux'

const { Content, Sider } = Layout;

class Settings extends Component{
      rootKeys = ['1', '2', '3'];

      state = {
        basicShow: '',
        nowOpen: '1',
        profileShow: 'none',
        rewardShow: 'none',
        userInfo: this.props.userInfo,
      };
    
      onOpenChange = (openKeys) => {
        switch (openKeys.key)
        {
          case '1':
          this.setState({
            nowOpen: '1',
            basicShow: '',
            profileShow: 'none',
            rewardShow: 'none',
          }) 
          break;
          case '2':
          this.setState({
            nowOpen: '2',
            basicShow: 'none',
            profileShow: '',
            rewardShow: 'none',
          })
          break;
          case '3':
          this.setState({
            nowOpen: '3',
            basicShow: 'none',
            profileShow: 'none',
            rewardShow: '',
          })
          break;
          default:
          this.setState({
            nowOpen: '1',
            basicShow: '',
            profileShow: 'none',
            rewardShow: 'none',
          })         
        }

      }
    render(){
        return(
            <div>
                <div className="selection-content">
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff', height: '80vh' }}>
                        <Menu  
                            mode="inline"
                            style={{ width: 200 }}
                            defaultSelectedKeys={['1']}
                            openKeys={this.state.openKeys}
                            onClick={this.onOpenChange}
                        >
                            <Menu.Item key="1">基础设置</Menu.Item>
                            <Menu.Item key="2">个人资料</Menu.Item>
                            <Menu.Item key="3">赞赏设置</Menu.Item>
                        </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280, overflow: 'hidden' }}>
                        <div className="basic-content" style={{display: this.state.basicShow}}>
                            <WrappedBasic basicShow={this.state.basicShow} userInfo={this.props.userInfo}/>
                        </div>
                        <div className="basic-content" style={{display: this.state.profileShow}}>
                            <WrappedProfile profileShow={this.state.profileShow} userInfo={this.props.userInfo}/>
                        </div>
                        <div className="basic-content" style={{display: this.state.rewardShow}}>
                            <WrappedReward rewardShow={this.state.rewardShow} userInfo={this.props.userInfo}/>
                        </div>
                          
                        </Content>
                </Layout>      
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {

    return {
        userInfo: state.user.userInfo,
    }
}

export default connect(mapStateToProps)(Settings)