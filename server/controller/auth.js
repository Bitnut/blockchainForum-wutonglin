const user = require('../models/mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var fs = require("fs");  
var path = require("path");
var http=require('http');



// 递归创建目录
function mkdirsSync(dirname, callback) {  
    if (fs.existsSync(dirname)) {
        return true;
      } else {
        if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
    }
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
            corpus_tag: '默认文集',
            release_status: 'no',
            post_title: '新建文章',
            post_content_raw: '',
            post_content_html: '',
            author_id : userInfo.user_id,
            author_name : userInfo.user_name,
        }
        const newArticleInfo = await user.newArticle(newArticleData);
        const userNews = await user.getUserNews(userInfo.user_id)
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
            userNews: userNews,
            info: '注册成功！'
        }
        const userDir = `./server/public/${name}/assets`
        mkdirsSync(userDir,(err) => {
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
        ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
        }
    } else {
        const userToken = {
        nickName: userInfo.user_name
        }
        const userArticles = await user.getUserArticles(userInfo.user_id);
        const userNews = await user.getUserNews(userInfo.user_id)
        const secret = 'Forum-token' // 指定密钥
        const token = jwt.sign(userToken, secret) // 签发token
        ctx.body = {
        success: true,
        userInfo: userInfo,
        userArticles: userArticles,
        userNews: userNews,
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


const getArticle = async function () {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTc0OTUxNTEsInVzZXJuYW1lIjoiSmltIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1NTc0NTkxNTF9.oEgppGRahJHDPV7-VgL4EkqVunoxmyLE-kQXQHJVyac"
    var options={
        hostname:'localhost',
        port:4000,
        path:'/channels/mychannel/chaincodes/mycc?peer=peer0.org1.example.com&fcn=richQueryPosts&args=%5B%22POST3%22%5D',
        method:'GET',
        headers:{
            'Content-Type':"application/json",
            "Authorization": 'Bearer ' + token,
        }
     }
     var articleInfo = ""
     return new Promise((resolve, reject) => {
         try {
            var req= http.request(options,function(res){
                console.log('STATUS:'+res.statusCode);
                console.log('HEADERS:'+JSON.stringify(res.headers));
                res.setEncoding('utf-8');
                res.on('data',function(chunk){
                    console.log('数据片段分隔-----------------------\r\n');
                    console.log(chunk);
                    articleInfo = chunk
                    
                });
                res.on("end",function(){
                    console.log(articleInfo);
		    try{resolve(JSON.parse(articleInfo));} catch (error) {reject(error);}
                })
            });
            req.on('error',function(err){
                console.error(err);
            });
            req.end();
         } catch (error) {
            reject(error);
         }
     })
     
}

const getArticleFromBlockchain = async function (ctx) {
    const result = await getArticle()
    ctx.body = {
        success: true,
        articleInfo: result,
        info: '成功！'
    }
}

const addArticleToBlockchain = async function (ctx) {
    const result = await addArticle()
    ctx.body = {
        success: true,
        articleInfo: result,
        info: '成功！'
    }
}

const addArticle = async function () {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTc0OTUxNTEsInVzZXJuYW1lIjoiSmltIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1NTc0NTkxNTF9.oEgppGRahJHDPV7-VgL4EkqVunoxmyLE-kQXQHJVyac"
    const requestData = {
        peers: ["peer0.org1.example.com","peer1.org1.example.com"],
        fcn: "addPost",
        args: ["4","什么是区块链?这是我见过的最通俗易懂的解释","<p>最近区块链非常火，关注度和曝光度持续上升，国内众多巨头公司纷纷张开双臂拥抱，把区块链当做互联网时代的伟大颠覆性创新，一窝蜂研究怎样把区块链变成自己抢占商业先机的工具。</p><p>那么，区块链技术究竟是什么呢？分开看每个汉字都认识，但是凑在一起就不知道是什么意思了。针对大家觉得神秘无比的区块链，现在有了一个最通俗易懂的解释方式。</p><p><strong>什么是区块链？我们首先用大家都爱谈的恋爱，举个简单的例子。</strong></p><p><strong>建立一个简单的区块链模型，那么在这个区块链模型里面谈恋爱将会出现一下情况：</strong></p><p></p><p></p><p></p><p></p><p></p><p></p><div><img src=", "100000003","2019-04-22 02:25:08","2019-04-09 07:00:27","64","2","0","4"]
    }
    console.log(JSON.stringify(requestData))
    var options={
        hostname:'localhost',
        port:4000,
        json: true,
        path:'/channels/mychannel/chaincodes/mycc',
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            "Authorization": 'Bearer ' + token,
        },
     }
     var articleInfo = ""
     return new Promise((resolve, reject) => {
         try {
            var req= http.request(options,function(res){
                console.log('STATUS:'+res.statusCode);
                console.log('HEADERS:'+JSON.stringify(res.headers));
                res.setEncoding('utf-8');
                res.on('data',function(chunk){
                    console.log('数据片段分隔-----------------------\r\n');
                    console.log(chunk);
                    articleInfo = chunk
                    
                });
                res.on("end",function(){
                    console.log(articleInfo);
		    try{resolve(JSON.parse(articleInfo));} catch (error) {reject(error);}
                })
            });
	    
            req.on('error',function(err){
                console.error(err);
            });
	    req.write(JSON.stringify(requestData));
            req.end();
         } catch (error) {
            reject(error);
         }
     })
     
}



module.exports = {
    userLogin,
    userRegistration,
    getArticleFromBlockchain,
    addArticleToBlockchain
}
