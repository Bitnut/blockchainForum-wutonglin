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

// 用户文章管理
const newArticle = async function (ctx) {
    const data = ctx.request.body
    const newInfo = await user.newArticle(data)
    ctx.body = {
        success: true,
        articleData: newInfo,
        info: '新文章创建成功！'
    }
}

const releaseArticle = async function (ctx) {
    const data = ctx.request.body
    const isReleased = await user.getReleaseData(data.postId)
    const newInfo = await user.refreshArticle(data, isReleased)
    if(newInfo[0]) {
        const result = await user.getArticle(data.postId);
        ctx.body = {
            success: true,
            articleData: result,
            info: '文章发布成功！'
        }
    } else {
        ctx.body = {
            success: false,
            info: '文章没有变动！'
        }
    }
    
}

const saveArticle = async function (ctx) { 
    const data = ctx.request.body
    const newInfo = await user.saveArticle(data)
    if(newInfo[0]) {
        const result = await user.getArticle(data.postId);
        ctx.body = {
            success: true,
            articleData: result,
            info: '文章保存成功！'
        }
    } else {
        ctx.body = {
            success: false,
            info: '文章没有变动！'
        }
    }
}

const getArticleById = async function (ctx) {
    const id = Number(ctx.params.id)
    result = await user.getReleasedArticle(id);
    if (result) {
        ctx.body = { 
            success: true,
            articleData: result,
            info: '获取文章成功！'
        }
    } else {
        ctx.throw(404)
    }
}

const removeArticleById = async function (ctx) {
    const result = await user.removeAritcleById(ctx.request.body.articleId)
    ctx.body = {
        success: true,
        articleData: result,
        info: '成功删除文章'
    }
}

// 用户管理文集
const addCorpus = async function (ctx) {
    const newCorpusData = ctx.request.body;
    user.refreshCorpus(newCorpusData.userId, newCorpusData.newCorpus);
}

const removeCorpus = async function (ctx) {
    const corpusInfo = ctx.request.body;
    const userId = corpusInfo.userId;
    const corpus = corpusInfo.corpus;
    user.removeAritcleByCorpus(userId, corpus)
    user.refreshCorpus(userId, corpusInfo.newCorpus);
    ctx.body = {
        success: true,
        info: '成功删除文集'
    }
}

const getHotArticles = async function (ctx) { 
    allArticles = await user.getAllArticles();
    ctx.body = {
        success: true,
        hotArticles: allArticles,
    }
  }

const getHomeData = async function (ctx) {
    hotArticles = await user.getAllArticles();
    hotUsers = await user.getHotUsers();
    if (hotArticles && hotUsers) {
        ctx.body = {
            success: true,
            hotArticles: hotArticles,
            hotUsers: hotUsers
        }
    } else {
        ctx.throw(404)
    }
    
}


// 用户设置更改
const changeSettings = async function (ctx) {
    const data = ctx.request.body
    const result = await user.refreshSettings(data); 
    if (result[0]) {
        ctx.body = {
            success: true,
            info: '设置更改成功！'
        }
    } else {
        ctx.body = {
            success: true,
            info: '设置没有变动'
        }
    } 

}
// 评论的获取和添加
const getCommentById = async function (ctx) {
    const id = Number(ctx.params.id)
    result = await user.getCommentList(id);
    if (result) {
        ctx.body = {
            success: true,
            commentList: result,
            info: '获取评论成功！'
        }
    } else {
        ctx.throw(404)
    }
}
const addComment = async function (ctx) {
    const data = ctx.request.body
    const result = await user.addNewComment(data);
    if (result) {
        ctx.body = {
            success: true,
            comment: result,
            info: '添加评论成功！'
        }
    } else {
        ctx.throw(404)
    }
}

const changeAvatar = async function (ctx) {
    const file = ctx.request.files.originFileObj
    const reader = fs.createReadStream(file.path);
    const userName = ctx.params.username
    try {
        // 创建可读流
        let targetPath = path.join(__dirname, '../public/'+userName) + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(targetPath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    } catch (error) {
        console.log(error)
    }
    const newUrl = 'http://localhost:8889/'+userName +`/${file.name}`
    const result = await user.changeAvatar(newUrl, userName);
    if (result) {
        ctx.body = {
            success: true,
            user_avatar: newUrl,
            info: '成功修改头像！'
        }
    } else {
        ctx.body = {
            success: false,
            info: '发生错误！'
        }
    }
}


const getUserInfoById = async function (ctx) {
    const id = Number(ctx.params.id)
    const userInfo = await user.getVisitInfo(id);
    if (userInfo.userInfo) {
        ctx.body = {
            success: true,
            visitData: userInfo,
            info: '成功访问！'
        }
    } else {
        ctx.throw(404)
    }
}



module.exports = {
    getHotArticles,
    newArticle,
    saveArticle,
    getArticleById,
    removeArticleById,
    addCorpus,
    removeCorpus,
    releaseArticle,
    changeSettings,
    getCommentById,
    addComment,
    changeAvatar,
    getUserInfoById,
    getHomeData
}