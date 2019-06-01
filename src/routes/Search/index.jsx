import React, {Component} from 'react'
import { Layout, Icon, List,  Skeleton, Empty} from 'antd'
import './index.css';
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
const { Content } = Layout;

// 模拟数据
const IconText = ({ type, text }) => (
<span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
</span>
);

class searchPage extends Component{
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        openKeys: ['sub1'],
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
    render(){
        const { isFetching } = this.props
        const isEmpty = this.props.data.length === 0
        if(!this.props.fetchStatus){
            return (<Redirect to="/404" />);
        }
        return( 
            <div className="search-content">
                {isEmpty
                ? (isFetching ? <Skeleton active /> 
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} imageStyle={{height: 200}} description={
                    <span>
                      啥也没查到
                    </span>
                  }/>)
                : <div>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Content style={{ padding: '0 24px', minHeight: 280, overflow: 'hidden' }}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            style={{ width: 1000 }}
                            pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 10,
                            }}
                            dataSource={this.props.data}
                            footer={<div><b>区块链知识</b> 分享论坛</div>}
                            renderItem={item => (
                            <List.Item
                                key={item.post_title}
                                actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                                extra={item.img === ''
                                ? <div></div>:<img width={272} height={200} alt="logo" src={item.intro_img} />
                                }
                            >
                                <List.Item.Meta
                                title={<Link to={"/article/"+item.post_id}>{item.post_title}</Link>}
                                />
                                {item.article_intro}
                            </List.Item>
                            )}
                        />
                        </Content>
                    </Layout>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.searchData.isFetching,
        data:state.searchData.listData,
        fetchStatus: state.searchData.fetchStatus
    }
}

export default connect(mapStateToProps)(searchPage)