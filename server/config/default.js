const config = {
    // 启动端口
    port: 8889,
  
    // 数据库配置
    database: {
      DATABASE: 'nodesql',
      USERNAME: 'root',
      PASSWORD: '123',
      PORT: '3306',
      HOST: 'localhost'
    }
  }
const Sequelize = require('sequelize'); // 引入sequelize

// 使用uri连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
const Forum = new Sequelize('mysql://root:123@localhost/nodesql',{
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  }
}) 

module.exports = {
  Forum, // 将ATM暴露出接口方便Model调用
  config
}