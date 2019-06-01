import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazy-load';
import {List, Card, Icon} from 'antd';  // 加载 JS
//import './CoverCard.css'
import { Link } from 'react-router-dom'
const { Meta } = Card;


   
export default class CoverCard extends PureComponent{
    static defaultProps = {
      grid: { gutter: 24, xs: 2, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4}
    }
    render(){
        const listData = []
        if(this.props.data.length>6){
            for(var i = 0; i<6; i++) {
                listData.push({
                    user_id: this.props.data[i].user_id,
                    user_avatar: this.props.data[i].user_avatar,
                    user_name: this.props.data[i].user_name,
                })
            }
        } else {
            this.props.data.forEach(element => {
                listData.push({
                    user_id: element.user_id,
                    user_avatar: element.user_avatar,
                    user_name: element.user_name,
                })
            });
        }
        return (
            <Card  title={<div style={{fontSize: 16, fontWeight: 400}}>
            <Icon type="deployment-unit" style={{ fontSize: 20,  marginRight: 10, color: '#FFA500' }} />
            向您推荐</div>}>
                <List
                grid={this.props.grid}
                dataSource={listData}
                renderItem={item=> (
                  <List.Item>
                    <Link to={'/u/'+item.user_id}>
                        <Card className={'simple-book-list'}
                            hoverable={true}
                            cover={ 
                            <LazyLoad   height={100}  offsetVertical={100} once>
                            <img alt={item.user_name} style={{height: '100px'}} src={item.user_avatar} />
                            </LazyLoad>}>
                            <Meta
                                title={item.user_name} 
                            />
                        </Card>        
                    </Link>
                </List.Item>
                )}
                /> 
        </Card>
        )
    }

}