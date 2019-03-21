const user = require('../models/mysql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// 用户注册
const userRegistration = async function (ctx) {
  const registerData = ctx.request.body // post过来的数据存在request.body里
  console.log(registerData)
  const userEmail = await user.getEmail(registerData.email)
  const userNickName = await user.getNickName(registerData.nickName)
  const userPhoneNum = await user.getPhoneNum(registerData.phoneNum)
  if (userEmail !== null) {
    ctx.body = {
      success: false,
      info: '邮箱已被使用！'
    }
    return
  } else if (userNickName != null) {
    ctx.body = {
      success: false,
      info: '该用户名已经存在！' 
    }
    return
  } else if (userPhoneNum != null) {
    ctx.body = {
      success: false,
      info: '该手机号码已被注册！' 
    }
    return
  } else {
    const data = ctx.request.body;
    var salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    const user_name = user.newUser(data);
    const userToken = {
      nickName: user_name
    }
    const secret = 'Forum-token' // 指定密钥
    const token = jwt.sign(userToken, secret) // 签发token
    ctx.body = {
      success: true,
      token: token, // 返回token
      info: '注册成功！'
    }
  }
}

// 用户登录
const userLogin = async function (ctx) {
    const data = ctx.request.body // post过来的数据存在request.body里  
    if (data.nickName == "") {
      ctx.body = {
        success: false,
        info: '该用户名不存在！' // 如果用户名为空返回用户不存在
      }
      return
    }
    const userInfo = await user.getUserByName(data.nickName);
    if (userInfo != null) { // 如果查无此用户会返回null
      if (!bcrypt.compareSync(data.password, userInfo.user_pass)) {
        //var salt = bcrypt.genSaltSync(10);
        //var hash = bcrypt.hashSync("123456", salt);
        //console.log(hash)
        ctx.body = {
          success: false, // success标志位是方便前端判断返回是正确与否
          info: '密码错误！'
        }
      } else {
        const userToken = {
          nickName: userInfo.user_name
        }
        const secret = 'Forum-token' // 指定密钥
        const token = jwt.sign(userToken, secret) // 签发token
        ctx.body = {
          success: true,
          token: token, // 返回token
          info: '登录成功！'
        }
      }
    } else {
      ctx.body = {
        success: false,
        info: '用户不存在！' // 如果用户不存在返回用户不存在
      }
    }
  }

  module.exports = {
    userLogin,
    userRegistration
  }