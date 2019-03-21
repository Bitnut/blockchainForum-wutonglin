import React, { PureComponent } from 'react';
import {List, Card, Icon} from 'antd';  // 加载 JS
import './IntroCard.css'

const { Meta } = Card;

export default class IntroCard extends PureComponent{

    static defaultProps = {
      grid: { gutter: 24, xs: 1, sm: 1, md: 4, lg: 4, xl: 4, xxl: 4}
    }
  
    render(){
        return (
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}><Icon type="thunderbolt" style={{ fontSize: 20,  marginRight: 10, color: '#FFA500' }} />{this.props.rankTypeData.typeName}</div>}
            >
                <List
                grid={this.props.grid}
                dataSource={this.props.rankTypeData.rankList}
                renderItem={item=> (
                  <List.Item>
                  <a href={`/info/${item.book.bookId}`}>
                  <Card 
                  hoverable
                  bordered={false}
                  className={"intro-card" }
                  >
                    <Meta
                      title={item.book.bookName} 
                      description={
                        <div>
                          <div className="intro-card-summary" >{item.book.summary.replace(/<br>/g, '        ')}</div>
                          <br></br>
                          <div className="intro-card-info"><span>{item.book.author}</span><span className="split">|</span><span style={{color: 'red'}}>{item.book.clickTimes}</span>&nbsp;点击</div>
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
