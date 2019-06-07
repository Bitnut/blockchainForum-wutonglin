# wutognlin-a-blockchain-forum-project

本项目是梧桐林的论坛主体部分，包括用户前端页面和后端服务器。

# 梧桐林的核心理念：

梧桐林是一个以知识分享为核心内容的论坛平台。和现有的论坛社区相同，梧桐林的内容全部由社区成员产出，并依托这些内容来提升论坛整体水平。梧桐林将给每位创作人所生产的价值以公平公正的认证，并以此为依据对优秀的创作人进行奖励。梧桐林的核心理念用一句话来概括就是：好文有好报。梧桐林的生态圈设计如图一所示。

![Image text](https://github.com/Bitnut/blockchainForum-bob/blob/master/ReadMeImg/concept.png)

梧桐林生态圈将用户分为普通用户和原创者两类，用户通过续费得到每月10点能量，这些能量由用户打赏给自己认可的好文章。梧桐林在月底根据能量池资金的多少按比例产出梧桐果，也就是图中的果子。梧桐果会由优秀的原创者获得，进入到他们的钱包中。和能量不同，梧桐果可以在论坛直接兑换成钱。另一方面好文章作为梧桐林的核心资产，通过梧桐林论坛下沉到底部的区块链中存储起来，支撑着论坛不断成长。

# 论坛经济体系设计：

论坛目前的功能模块如下图二所示：

![Image text](https://github.com/Bitnut/blockchainForum-bob/blob/master/ReadMeImg/models.png)


论坛的经济体系不以盈利为主要目的，而是力求在创造一个公平公正的价值评判体系的同时，将所得以公开的形式转移到优秀的内容创作者手中。下面通过简略的操作流程来展示这个经济体系是如何运行的。如图二所示：

+ 付费： 游客通过注册并提交少量费用获得浏览社区活动的权利，所有的用户续费构成论坛的每月公共主体收入。资金注入到梧桐果园（资金池）。

+ 排序：社区成员可以通过发文获得其他用户认可并打赏会增加文章的热度，当热度累积到一定程度，文章的创作者能够获得与论坛分润的权利。分润的比例由智能合约的算法逻辑计算得出。

+ 奖励：每月底梧桐林尽可能公平公正地给予用户生产内容的价值评价。并通过公开奖励社区代币（梧桐果）的方式激励更多的优秀用户继续创作优质的内容和价值。
梧桐林的核心理念是“好文有好报”，通过最广泛的群众力量筛选出优质的内容和信息呈现给梧桐林的用户，最终创造一个不断涌现优秀人才和思想的良好论坛环境。

![Image text](https://github.com/Bitnut/blockchainForum-bob/blob/master/ReadMeImg/eco-system.png)

# 环境配置：

1. 安装项目依赖

cd 到根目录

yarn install 下载并安装依赖

yarn start 启动前端

2. 配置后端数据库

论坛使用的是MySQL，开发环境是 Ubuntu 16.04，通过 apt 安装数据库。

数据库配置文件为： 

    /server/config/default.js 

可以根据自己的需求进行修改

数据库脚本： 

    /server/MySQLSript/mysql-languages.sql

3. 后端启动：

后端服务器启动文件是 

    /server/app.js

可以 node ./server/app.js

嫌麻烦的话，如果你使用 vscode，可以直接 f5 用 debug 模式启动服务器，我已经配置好脚本

4. 区块链依赖：

区块链使用的是 HyperLedger Fabric 这里是论坛主体。项目中用到区块链的部分如果没有搭建区块链会有bug，这里暂时不给出详细的区块链搭建过程。


# 项目部分功能展示

论坛主页：

<img src="https://github.com/Bitnut/blockchainForum-bob/blob/master/ReadMeImg/mainpage.gif"  width="900px"/>

论坛登录/退出登录：

<img src="https://github.com/Bitnut/blockchainForum-bob/blob/master/ReadMeImg/login.gif"  width="900px"/>
