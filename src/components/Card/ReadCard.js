import React, { PureComponent } from 'react';
import {List, Card, Icon,  Avatar,   Button, Skeleton, } from 'antd';  // 加载 JS
import './CoverCard.css'
import reqwest from 'reqwest';
import avatar from '../../assets/smallBanner.jpg'

const count = 6;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

export default class CoverCard extends PureComponent{

  state = {
    initLoading: true,
    loading: false,
    data: [],
    list: [],
    avatar: avatar,
  }

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    this.getData((res) => {
      const data = this.state.data.concat(res.results);
      this.setState({
        data,
        list: data,
        loading: false,
      }, () => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });
  }
  

    render(){
      const { initLoading, loading, list } = this.state;
      const loadMore = !initLoading && !loading ? (
        <div style={{
          textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px',
        }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;
  
        return (
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}>
            <Icon type="deployment-unit" style={{ fontSize: 20,  marginRight: 10, color: '#FFA500' }} />
            {this.props.rankTypeData.typeName}</div>}>
            <List
              className="demo-loadmore-list"
              loading={initLoading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={<Avatar src={this.state.avatar} />}
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div>content</div>
                  </Skeleton>
                </List.Item>
              )}
            />
            </Card>
        )
    }

}