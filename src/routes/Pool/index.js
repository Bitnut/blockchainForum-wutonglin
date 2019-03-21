import React, {Component} from 'react'
import { Layout, Avatar, List} from 'antd'
import { Sparklines, SparklinesLine, SparklinesBars  } from 'react-sparklines';

import avatar from '../../assets/smallBanner.jpg'
import './index.css';
const { Content} = Layout;

const sampleData100 = [0,0,0,0,0,1,1,10,6,5,1,5,1,1,1,5,5,6,16,10,16,10,15,19,20,50,30,40,35,30,45]


  const listData = [];
  for (let i = 308; i < 390; i++) {
    listData.push({
      title: `fake user0${i}`,
      avatar: avatar,
      description: '10xp rewarded',
      content: '10xp rewarded'
    });
  }

export default class Pool extends Component{
    state = {
        typeId: "1",
        openKeys: "1",
        current: 'mail',
      };
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
        return(
            <div>
              <div className="info-background">
                  
              </div>
              <div className="selection-content">
                  <Layout style={{ padding: '24px 0', background: '#fff' }}>
                      <Content style={{ padding: '0 24px', minHeight: 300, overflow: 'hidden' }}>
                      <Sparklines data={sampleData100} limit={20}>
                          <SparklinesBars style={{ fill: "#FFA500", fillOpacity: ".25" }} />
                          <SparklinesLine style={{ stroke: "#FFA500", fill: "none" }} />
                      </Sparklines>
                      </Content>
                      <Content style={{ padding: '0 24px', minHeight: 280, overflow: 'hidden' }}>
                      <List
                          grid={{ gutter: 16, column: 4 }}
                          itemLayout="vertical"
                          size="small"
                          pagination={{
                          onChange: (page) => {
                              console.log(page);
                          },
                          pageSize: 16,
                          }}
                          dataSource={listData}
                          footer={<div><b>ant design</b> footer part</div>}
                          renderItem={item => (
                          <List.Item
                              key={item.title}
                          >
                              <List.Item.Meta
                              avatar={<Avatar src={item.avatar} />}
                              title={<a href={item.href}>{item.title}</a>}
                              />
                              <div>{item.content}</div>
                          </List.Item>
                          )}
                      />
                      </Content>
              </Layout>      
              </div>
            </div>
        )
    }
}