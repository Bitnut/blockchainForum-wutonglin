import React, { PureComponent } from 'react';
import {List, Card, Icon, Button, message} from 'antd';  // 加载 JS
import './IntroCard.css'

const { Meta } = Card;

const count = 2;

export default class IntroCard extends PureComponent{
    static defaultProps = {
        grid: { gutter: 24, xs: 1, sm: 1, md: 4, lg: 4, xl: 4, xxl: 4},
        
    }
    state = {
        listLen: 10,
        list: [],
        data: [],
        initLoading: false,
        loading: false,
    }
    componentDidMount () {
        this.setState({list: this.props.data.slice(0,8)})
    }
    _onLoadMore = () => {
        if (this.state.listLen >= this.props.data.length) {
            message.warning('没有更多新消息了！')
        }
        this.setState({
          loading: true,
          list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        });
        const newCount = this.state.listLen-1+2
        const data = this.props.data.slice(0,newCount)
        this.setState({
            data,
            list: data,
            loading: false,
            listLen: newCount
        }, () => {
            // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
            // In real scene, you can using public method of react-virtualized:
            // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
            window.dispatchEvent(new Event('resize'));
        });
    }

    render(){
        const { initLoading, loading } = this.state;
        const loadMore = !initLoading && !loading ? (
            <div style={{
            textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
            }}
            >
            <Button onClick={this._onLoadMore}>loading more</Button>
            </div>
        ) : null;

        return (
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}><Icon type="thunderbolt" style={{ fontSize: 20,  marginRight: 10, color: '#FFA500' }} />论坛内容速递</div>}
            >
                <List
                grid={this.props.grid}
                dataSource={this.state.list}
                loadMore={loadMore}
                renderItem={item=> (
                  <List.Item>
                  <a href={`article/${item.post_id}`}>
                  <Card 
                  hoverable
                  bordered={false}
                  className={"intro-card" }
                  >
                    <Meta
                      title={item.post_title} 
                      description={
                        <div>
                          <br/>
                          <br/>
                          <div className="intro-card-info"><span>作者： {item.author_name}</span><span className="split">|</span><span style={{color: 'red'}}>{item.post_views}</span>&nbsp;点击</div>
                        </div>
                      }
                    />     
                  </Card>
                  </a>
                </List.Item>
                )}
                /> 
        </Card>
        )
    }

}
