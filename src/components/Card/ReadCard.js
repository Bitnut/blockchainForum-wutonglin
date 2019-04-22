import React, { PureComponent } from 'react';
import {List, Card, Icon,  Avatar,   Button, Skeleton, } from 'antd';  // 加载 JS
import './CoverCard.css'
import avatar from '../../assets/smallBanner.jpg'

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
    );

export default class CoverCard extends PureComponent{

  state = {
    initLoading: true,
    loading: false,
    listData: [],
  }

    componentDidMount () {
        if(this.props.data!==null) {
            setTimeout(() => {
                const list = [];
                for (let i = 0; i < this.props.data.length; i++) {
                    list.push({
                        title: this.props.data[i].post_title,
                        content: this.props.data[i].article_intro,
                        img: this.props.data[i].intro_img,
                        link: 'http://localhost:3000/article/'+this.props.data[i].post_id
                    });
                }
                this.setState({
                    listData: [...list],
                });
                }, 50);
        }
    }
  

    render(){
        
        return (
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}>
            <Icon type="deployment-unit" style={{ fontSize: 20,  marginRight: 10, color: '#FFA500' }} />
            最新文章</div>}>
                <List
                    itemLayout="vertical"
                    size="large"
                    style={{ width: 1200 }}
                    pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                    }}
                    dataSource={this.state.listData}
                    footer={<div><b>区块链知识</b> 分享论坛</div>}
                    renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        extra={item.img === ''
                        ? <div></div>:<img width={272} height={200} alt="logo" src={item.img} />
                        }
                    >
                        <List.Item.Meta
                        title={<a href={item.link}>{item.title}</a>}
                        description={item.description}
                        />
                        {item.content}
                    </List.Item>
                    )}
                />
            </Card>
        )
    }

}