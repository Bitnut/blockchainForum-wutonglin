import React from 'react'
import './index.css'
import {Icon, Timeline} from 'antd'

const Jobs = () => (
    <div className='page-holder'>
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
                    <Timeline.Item color="green">
                        <p>第四次开会 4月24日</p>
                        <p>16.&nbsp;&nbsp;&nbsp;网站全局路由守护</p>
                        <p>17.&nbsp;&nbsp;&nbsp;评论功能上线</p>
                        <p>18.&nbsp;&nbsp;&nbsp;404页面</p>
                        <p>19.&nbsp;&nbsp;&nbsp;个人头像上传</p>
                        <p>20.&nbsp;&nbsp;&nbsp;网站静态资源服务</p>
                        <p>21.&nbsp;&nbsp;&nbsp;文章编辑器功能改进</p>
                        <p>22.&nbsp;&nbsp;&nbsp;项目css布局抖动排查，优化网站首屏加载性能</p>
                        <p>23.&nbsp;&nbsp;&nbsp;网站主页优化</p>
                    </Timeline.Item>
                    <Timeline.Item>
                        <p>过去两周计划完成情况</p>
                        <p>&nbsp;&nbsp;&nbsp;建设网站点赞、收藏、打赏+奖励池体系<Icon type="check" /></p>
                        <p>&nbsp;&nbsp;&nbsp;使用 Hyperledger Fabric 存储文章信息、奖励池信息，版权纠纷信息<Icon type="issues-close" /></p>
                        <p>&nbsp;&nbsp;&nbsp;引入redis做为首页、奖励池和公示页面的缓存服务器<Icon type="stop" /></p>
                        <p>&nbsp;&nbsp;&nbsp;着手写毕业论文<Icon type="info-circle" /></p>
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        <p>接下来毕业论文最后阶段计划</p>
                        <p>&nbsp;&nbsp;&nbsp;实现 Hyperledger Fabric 存储文章信息、奖励池信息(2-3天)</p>
                        <p>&nbsp;&nbsp;&nbsp;完成毕业论文初稿(一周)</p>
                        <p>&nbsp;&nbsp;&nbsp;修改查重毕业论文</p>
                    </Timeline.Item>
                </Timeline>
            <h1>本周完成的任务：</h1>
                <ul>
                    <p>&nbsp;&nbsp;&nbsp;项目计划书完成 3 稿<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;Hyperledger Fabric 1.1 网络搭建<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;chaincode 试开发<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;【安全改善】html嵌入危险标签过滤（抵御xxs攻击）<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;评论列表-回复显示创建时间并实时更新<Icon type="check" /></p>      
                    <p>&nbsp;&nbsp;&nbsp;个人设置-改进功能：停止修改用户名、用户邮箱、用户手机<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;区分个人界面接口和访问页面<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;完整的个人页面<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;完善的文章页面<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;点赞收藏功能<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;打赏关注功能<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;文章点击量功能<Icon type="check" /></p>
                    <p>&nbsp;&nbsp;&nbsp;单元测试 jest 工具学习和使用<Icon type="warning" /></p>
                </ul>

            <h1>遇到的一些问题：<Icon type="question" /></h1>
                <ul>
                    <p>1.&nbsp;&nbsp;&nbsp;测试工作怎么快速完成？</p>
                    <p>2.&nbsp;&nbsp;&nbsp;项目代码和打包需要优化么？</p>
                    <p>3.&nbsp;&nbsp;&nbsp;毕业论文注意事项？</p>
                </ul>
            <h1>项目目前为止使用到的一些开源项目</h1>
                <ul>
                    <p>1.&nbsp;&nbsp;&nbsp;reactjs</p>
                    <p>2.&nbsp;&nbsp;&nbsp;antd</p>
                    <p>3.&nbsp;&nbsp;&nbsp;braft-editor</p>
                    <p>4.&nbsp;&nbsp;&nbsp;koa</p>
                    <p>5.&nbsp;&nbsp;&nbsp;koa-bodyparser</p>
                    <p>6.&nbsp;&nbsp;&nbsp;koa-logger</p>
                    <p>7.&nbsp;&nbsp;&nbsp;koa-router</p>
                    <p>8.&nbsp;&nbsp;&nbsp;react-redux</p>
                    <p>9.&nbsp;&nbsp;&nbsp;react-virtualized</p>
                    <p>10.&nbsp;&nbsp;&nbsp;redux-thunk</p>
                    <p>11.&nbsp;&nbsp;&nbsp;sequelize</p>
                    <p>12.&nbsp;&nbsp;&nbsp;sanitize-html</p>
                </ul>
         </div>
    </div>
        
)

export default Jobs;