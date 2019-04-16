import React from 'react'
import four from '../../assets/4.png';
import zero from '../../assets/smallBanner.jpg'
import './index.css'
import {Icon, Button, List, Card} from 'antd'
import {
    Link
  } from 'react-router-dom'

const data = [
{
    title: '前往主页：',
    path: '/',
    buttonContent: '跳转主页',
    icon: <Icon type="home" />
},
{
    title: '开始写作：',
    path: '/user/writing',
    buttonContent: '写文章',
    icon: <Icon type="edit" />
},
{
    title: '浏览更多精彩：',
    path: '/selection',
    buttonContent: '浏览更多',
    icon: <Icon type="compass" />
},
];

const ErrorPage = () => (
    <div className='error-page'>
        <div className='middle-content'>
        <h1>OH ERROR!</h1>
        <img src = {four} alt='4'></img>  <img src = {zero} alt='0'></img>   <img src = {four} alt='4'></img>
        <br/>
        <br/>
        <br/>
        <h2>您来到了没有知识的荒漠～</h2>
        <br/>
        <br/>
        <br/>
        <h2>我们推荐您：</h2>
        <p>很抱歉给您带来了不好的体验，您可以</p>
        <List
            grid={{
                gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
              }}
            dataSource={data}
            renderItem={item => (
            <List.Item>
                <Card title={[item.title, item.icon]} hoverable><Button type="primary" shape="round" size='large' ><Link to={item.path}>{item.buttonContent}</Link></Button></Card>
            </List.Item>
            )}
        />
        </div>
        
    </div>
)

export default ErrorPage;