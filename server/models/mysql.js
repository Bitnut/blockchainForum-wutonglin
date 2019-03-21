const db = require('../config/default') // 引入user的表结构
const usersModel = '../schema/users.js'
const postsModel = '../schema/posts.js'
const ForumDb = db.Forum // 引入数据库

const User = ForumDb.import(usersModel) // 用sequelize的import方法引入表结构，实例化了User。
const Posts = ForumDb.import(postsModel) // 用sequelize的import方法引入表结构，实例化了User。
// 登录时返回所有用户信息
const getUserByName = async function (nickName) { 
  const userInfo = await User.findOne({
    where: {
      user_name: nickName
    }
  })
  return userInfo
}
// 注册时验证重复性用
const getEmail = async function (email) { 
  const userInfo = await User.findOne({
    where: {
      user_email: email
    }
  })
  return userInfo
}
const getNickName = async function (nickName) { 
  const userInfo = await User.findOne({
    where: {
      user_name: nickName
    }
  })
  return userInfo
}
const getPhoneNum = async function (phoneNum) { 
  const userInfo = await User.findOne({
    where: {
      user_phone: phoneNum
    }
  })
  return userInfo
}

// 注册函数
const newUser = async function (userInfo){  
  const Info = await User.create(
    {
      user_id: null,
      user_email: userInfo.email,
      user_name: userInfo.nickName,
      user_pass: userInfo.password,                    
      user_phone: userInfo.phoneNum,
      signup_moment: userInfo.time,
    }
  )
  return Info.user_name
}

const changeBalance = async function (id, newbalance){ 
  const balance = await User.update(
    {
      balance: newbalance
    },
    {
      where: {
        card_id: id
      }
    }
  )
  return balance
}

const getBalance = async function (id){
  const balance = await User.findOne(
    {
      where: {
        card_id: id
      },
      attributes: ['balance']
    }
    
  )
  return balance
}

const newPassword = async function (id, newPwd){  // 获取某个用户的全部todolist
  const balance = await User.update(
    {
      password: newPwd
    },
    {
      where: {
        card_id: id
      }
    }
  )
  return result[0] === 1
}


module.exports = {
  getEmail,
  getNickName,
  getPhoneNum,
  newUser,
  getUserByName, // 导出getUserById的方法，将会在controller里调用
  getBalance,
  changeBalance,
  newPassword
}