import React from 'react'
import './index.css'
import {Icon, Timeline} from 'antd'

const Jobs = () => (
        <div className='All-Jobs'>
            <h1>工作进度如下所示：</h1>
                <Timeline>
                    <Timeline.Item color="green">
                    <p>项目初始阶段 3月8日</p>
                    <p>1.&nbsp;&nbsp;&nbsp;网站主页</p>
                    <p>2.&nbsp;&nbsp;&nbsp;网站登录模块</p>
                    <p>3.&nbsp;&nbsp;&nbsp;个人密码加密</p>
                    <p>4.&nbsp;&nbsp;&nbsp;网站个人主页面</p>
                    <p>5.&nbsp;&nbsp;&nbsp;奖励池页面</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                    <p>第二次开会 3月26日</p>
                    <p>6.&nbsp;&nbsp;&nbsp;网站个人信息页面</p>
                    <p>7.&nbsp;&nbsp;&nbsp;创建网站写作模块</p>
                    <p>8.&nbsp;&nbsp;&nbsp;后端数据库表格设计</p>
                    <p>9.&nbsp;&nbsp;&nbsp;后端api接口</p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                    <p>第三次开会 4月10日</p>
                    <p>10.&nbsp;&nbsp;&nbsp;加入redux状态管理容器</p>
                    <p>11.&nbsp;&nbsp;&nbsp;后端token验证</p>
                    <p>12.&nbsp;&nbsp;&nbsp;浏览文章页面</p>
                    <p>13.&nbsp;&nbsp;&nbsp;网站写作模块完善</p>
                    <p>13.&nbsp;&nbsp;&nbsp;个人主页完善</p>
                    <p>14.&nbsp;&nbsp;&nbsp;代码重构</p>
                    <p>15.&nbsp;&nbsp;&nbsp;后端api接口维护</p>
                    </Timeline.Item>
                    <Timeline.Item>
                        <p>16.&nbsp;&nbsp;&nbsp;网站全局路由守护</p>
                        <p>16.&nbsp;&nbsp;&nbsp;评论点赞功能</p>
                        <p>16.&nbsp;&nbsp;&nbsp;404页面</p>
                        <p>16.&nbsp;&nbsp;&nbsp;网站全局路由守护</p>
                        <p>16.&nbsp;&nbsp;&nbsp;网站全局路由守护</p>
                        <p>16.&nbsp;&nbsp;&nbsp;网站全局路由守护</p>        
                    </Timeline.Item>
                </Timeline>
            <h1>本周完成的任务：</h1>
                <ul>
                    <p>1.&nbsp;&nbsp;&nbsp;路由守卫功能<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;404页面<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;全局服务器交互错误处理提示<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;文章服务器错误恢复<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;文章编辑页面-侧边栏树结构重构<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;文章编辑页面-新增删除文章功能<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;文章编辑页面-删除文章的警示<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;文章编辑页面-修改文章选择逻辑<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;文章编辑页面-新增保存功能<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;文章编辑页面-新增预览文章功能<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;文章编辑页面-查看'已发布'文章功能<Icon type="plus-circle" /></p>
                    完成 MarkdownViewer
                </ul>
            <h1>修改完成的bug如下所示：</h1>
                <ul>
                    <p>1.&nbsp;&nbsp;&nbsp;文章编辑页面-用户文章列表新增文章异步操作有误<Icon type="exclamation" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;新增用户的个人界面写作经历bug<Icon type="check" /></p>
                    <p>3.&nbsp;&nbsp;&nbsp;action：skipLogin 未能在刷新页面先执行<Icon type="exclamation" /></p>
                    <p>4.&nbsp;&nbsp;&nbsp;通过url进入文章编辑界面，header未能隐藏<Icon type="exclamation" /></p>
                    <p>5.&nbsp;&nbsp;&nbsp;文章编辑页面-异步获取文章数据有误<Icon type="exclamation" /></p>
                    <p>6.&nbsp;&nbsp;&nbsp;文章编辑页面-发布文章bug<Icon type="exclamation" /></p>
                    <p>6.&nbsp;&nbsp;&nbsp;可以查看到未发布的个人隐私文章<Icon type="exclamation" /></p>
                </ul>
            <h1>项目目前为止使用到的一些开源项目</h1>
                <ul>
                    <p>1.&nbsp;&nbsp;&nbsp;reactjs</p>
                    <p>1.&nbsp;&nbsp;&nbsp;antd</p>
                    <p>1.&nbsp;&nbsp;&nbsp;braft-editor</p>
                    <p>1.&nbsp;&nbsp;&nbsp;koa</p>
                    <p>1.&nbsp;&nbsp;&nbsp;koa-bodyparser</p>
                    <p>1.&nbsp;&nbsp;&nbsp;koa-logger</p>
                    <p>1.&nbsp;&nbsp;&nbsp;koa-router</p>
                    <p>1.&nbsp;&nbsp;&nbsp;react-redux</p>
                    <p>1.&nbsp;&nbsp;&nbsp;react-virtualized</p>
                    <p>1.&nbsp;&nbsp;&nbsp;redux-thunk</p>
                    <p>1.&nbsp;&nbsp;&nbsp;sequelize</p>
                    <p>1.&nbsp;&nbsp;&nbsp;sanitize-html</p>
                </ul>

         </div>
)

export default Jobs;