const user = require('../models/mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var fs = require("fs");  
var path = require("path");

// 递归创建目录
function mkdirs(dirname, callback) {  
  fs.exists(dirname, function (exists) {  
      if (exists) {  
          callback();  
      } else {  
          // console.log(path.dirname(dirname));  
          mkdirs(path.dirname(dirname), function () {  
              fs.mkdir(dirname, callback);  
              console.log('在' + path.dirname(dirname) + '目录创建好' + dirname  +'目录');
          });  
      }  
  });  
}

// 用户注册
const userRegistration = async function (ctx) {
    const registerData = ctx.request.body // post过来的数据存在request.body里
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
        var salt = bcrypt.genSaltSync(10);
        registerData.password = bcrypt.hashSync(registerData.password, salt);
        const userInfo = await user.newUser(registerData);
        const newArticleData = {
            corpus: '默认文集',
            release_status: 'no',
            title: '新建文章',
            rawContent: '',
            htmlContent: '',
            authorId : userInfo.user_id,
        }
        const newArticleInfo = await user.newArticle(newArticleData);
        const newArticle = [newArticleInfo]
        const name = userInfo.user_name;
        const userToken = {
            nickName: name
        }
        const secret = 'Forum-token' // 指定密钥
        const token = jwt.sign(userToken, secret) // 签发token
        ctx.body = {
            success: true,
            token: token, // 返回token
            userInfo: userInfo,
            articles: newArticle,
            info: '注册成功！'
        }
        const userDir = `./server/public/${name}/assets`
        mkdirs(userDir,(err) => {
            console.log(err);
        })    
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
    const userInfo = await user.getUserInfoByName(data.nickName);
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
        const userArticles = await user.getUserArticles(userInfo.user_id);
        const secret = 'Forum-token' // 指定密钥
        const token = jwt.sign(userToken, secret) // 签发token
        ctx.body = {
        success: true,
        userInfo: userInfo,
        userArticles: userArticles,
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

const userLoginByToken = async function (ctx) {
    const data = ctx.request.body // post过来的数据存在request.body里
    
    ctx.body = {
    success: true,
    userInfo: userInfo,
    token: token, // 返回token
    info: '登录成功！'
    }
    
}

module.exports = {
    userLogin,
    userRegistration
}