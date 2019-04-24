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
                    <Timeline.Item>
                        <p>过去两周</p>
                        <p>16.&nbsp;&nbsp;&nbsp;网站全局路由守护</p>
                        <p>17.&nbsp;&nbsp;&nbsp;评论功能上线</p>
                        <p>18.&nbsp;&nbsp;&nbsp;404页面</p>
                        <p>19.&nbsp;&nbsp;&nbsp;个人头像上传</p>
                        <p>20.&nbsp;&nbsp;&nbsp;网站静态资源服务</p>
                        <p>21.&nbsp;&nbsp;&nbsp;文章编辑器功能改进</p>
                        <p>22.&nbsp;&nbsp;&nbsp;项目css布局抖动排查，优化网站首屏加载性能</p>
                        <p>23.&nbsp;&nbsp;&nbsp;网站主页优化</p>
                    </Timeline.Item>
                    <Timeline.Item color="grey">
                        <p>接下来两周的任务</p>
                        <p>&nbsp;&nbsp;&nbsp;建设网站点赞、收藏、打赏+奖励池体系</p>
                        <p>&nbsp;&nbsp;&nbsp;使用 Hyperledger Fabric 存储文章信息、奖励池信息，版权纠纷信息</p>
                        <p>&nbsp;&nbsp;&nbsp;引入redis做为首页、奖励池和公示页面的缓存服务器</p>
                        <p>&nbsp;&nbsp;&nbsp;着手写毕业论文</p>
                    </Timeline.Item>
                </Timeline>
            <h1>本周完成的任务：</h1>
                <ul>
                    <p>1.&nbsp;&nbsp;&nbsp;【安全】路由守卫功能<Icon type="plus-circle" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;404页面<Icon type="plus-circle" /></p>
                    <p>3.&nbsp;&nbsp;&nbsp;【安全】全局服务器交互错误处理提示<Icon type="plus-circle" /></p>
                    <p>4.&nbsp;&nbsp;&nbsp;文章服务器错误恢复<Icon type="plus-circle" /></p>
                    <p>5.&nbsp;&nbsp;&nbsp;文章编辑页面-侧边栏树结构重构<Icon type="plus-circle" /></p>
                    <p>6.&nbsp;&nbsp;&nbsp;文章编辑页面-新增删除文章功能<Icon type="plus-circle" /></p>
                    <p>7.&nbsp;&nbsp;&nbsp;文章编辑页面-删除文章的警示<Icon type="plus-circle" /></p>
                    <p>8.&nbsp;&nbsp;&nbsp;文章编辑页面-修改文章选择逻辑<Icon type="plus-circle" /></p>
                    <p>9.&nbsp;&nbsp;&nbsp;文章编辑页面-新增保存功能<Icon type="plus-circle" /></p>
                    <p>10.&nbsp;&nbsp;&nbsp;文章编辑页面-新增预览文章功能<Icon type="plus-circle" /></p>
                    <p>11.&nbsp;&nbsp;&nbsp;文章编辑页面-查看'已发布'文章功能<Icon type="plus-circle" /></p>
                    <p>12.&nbsp;&nbsp;&nbsp;评论列表-创建、样式修改<Icon type="plus-circle" /></p>
                    <p>13.&nbsp;&nbsp;&nbsp;评论列表-添加评论编辑器功能<Icon type="plus-circle" /></p>
                    <p>14.&nbsp;&nbsp;&nbsp;评论列表-允许html标签嵌入，以丰富编辑器功能<Icon type="plus-circle" /></p>
                    <p>15.&nbsp;&nbsp;&nbsp;【安全】评论列表-html嵌入危险标签过滤（抵御xxs攻击）<Icon type="plus-circle" /></p>
                    <p>16.&nbsp;&nbsp;&nbsp;评论列表-回复显示创建时间<Icon type="plus-circle" /></p>
                    <p>17.&nbsp;&nbsp;&nbsp;评论列表-添加回复评论功能<Icon type="plus-circle" /></p>
                    <p>18.&nbsp;&nbsp;&nbsp;评论列表-通过 redux 与后端交互<Icon type="plus-circle" /></p>
                    <p>19.&nbsp;&nbsp;&nbsp;评论列表-显示楼层<Icon type="plus-circle" /></p>
                    <p>20.&nbsp;&nbsp;&nbsp;个人设置-改进功能：停止修改用户名、用户邮箱、用户手机<Icon type="plus-circle" /></p>
                    <p>21.&nbsp;&nbsp;&nbsp;个人设置-添加上传修改头像功能<Icon type="plus-circle" /></p>
                    <p>22.&nbsp;&nbsp;&nbsp;koa-后端添加静态资源服务<Icon type="plus-circle" /></p>
                    <p>23.&nbsp;&nbsp;&nbsp;【安全】koa-后端静态资源服务错误处理<Icon type="plus-circle" /></p>
                    <p>23.&nbsp;&nbsp;&nbsp;主页页面优化<Icon type="plus-circle" /></p>
                    <p>23.&nbsp;&nbsp;&nbsp;添加访问个人界面接口和页面<Icon type="plus-circle" /></p>
                    <p>24.&nbsp;&nbsp;&nbsp;互联网+报名准备工作<Icon type="plus-circle" /></p>
                </ul>
            <h1>修改完成的bug如下所示：</h1>
                <ul>
                    <p>1.&nbsp;&nbsp;&nbsp;文章编辑页面-用户文章列表新增文章异步操作有误<Icon type="check" /></p>
                    <p>2.&nbsp;&nbsp;&nbsp;新增用户的个人界面写作经历bug<Icon type="check" /></p>
                    <p>3.&nbsp;&nbsp;&nbsp;redux-action：skipLogin 未能在刷新页面先执行<Icon type="check" /></p>
                    <p>4.&nbsp;&nbsp;&nbsp;通过url进入文章编辑界面，header未能隐藏<Icon type="check" /></p>
                    <p>5.&nbsp;&nbsp;&nbsp;文章编辑页面-异步获取文章数据有误<Icon type="check" /></p>
                    <p>6.&nbsp;&nbsp;&nbsp;文章编辑页面-发布文章bug<Icon type="check" /></p>
                    <p>7.&nbsp;&nbsp;&nbsp;可以查看到未发布的个人隐私文章<Icon type="check" /></p>
                    <p>8.&nbsp;&nbsp;&nbsp;fetch 请求没有错误处理，和404页面<Icon type="check" /></p>
                    <p>9.&nbsp;&nbsp;&nbsp;危险 nodejs 操作导致服务器崩溃<Icon type="check" /></p>
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