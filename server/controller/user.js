const user = require('../models/mysql');
var fs = require("fs");  
var path = require("path");
var http=require('http');


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
    var data = ctx.request.body
    var transaction_id = ''
    const isReleased = await user.getReleaseData(data.post_id)
    const newInfo = await user.refreshArticle(data, isReleased)
    if(newInfo[0]) {
        const result = await user.getArticle(data.post_id);
        transaction_id = await addArticleToBlockchain(result)
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
    if(transaction_id!==null) {
        const writeResult = user.refreshTransactionId(data.post_id, transaction_id)
    }
}

const addArticleToBlockchain = async function (articleInfo) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTk0MDk2NDYsInVzZXJuYW1lIjoiSmltIiwib3JnTmFtZSI6Ik9yZzEiLCJpYXQiOjE1NTkzNzM2NDZ9.4Q9SXkhDxlinof2-ZuWh1dr-FZmZoP1DIhQwN2u2zgo"
    const requestData = {
        peers: ["peer0.org1.example.com","peer1.org1.example.com"],
        fcn: "addPost",
        args: [articleInfo.post_id.toString(),articleInfo.post_title,articleInfo.post_content_html, articleInfo.author_name,
            articleInfo.release_moment,articleInfo.post_moment,articleInfo.post_views.toString(),articleInfo.post_collects.toString(),
            articleInfo.post_likes.toString(),articleInfo.post_reward.toString()]
        
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
                    transaction_id = chunk
                    
                });
                res.on("end",function(){
                    console.log(transaction_id);
		    try{resolve(transaction_id);} catch (error) {reject(error);}
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





const saveArticle = async function (ctx) { 
    const data = ctx.request.body
    const newInfo = await user.saveArticle(data)
    if(newInfo[0]) {
        const result = await user.getArticle(data.post_id);
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
    const data = ctx.request.body
    var result = await user.getReleasedArticle(data.post_id);
    result.post_views = ++result.post_views
    // 点赞收藏信息获取
    const article_status = await user.getArticleStatus(data)
    if (result) {
        ctx.body = { 
            success: true,
            articleData: result,
            article_status: article_status,
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
    ctx.body = {
        success: true,
        user_avatar: newUrl,
        info: '成功修改头像！'
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



// 点赞、收藏、关注  逻辑不严谨，有bug，不做细究了。
const addlike = async function (ctx) {
    const data = ctx.request.body
    const result = await user.addlike(data);
    if (result) {
        if(result.info){
            ctx.body = {
                success: false,
                info: result.info
            }
        } else {
            ctx.body = {
                success: 'true',
                info: '点赞成功！'
            }
        }
    } else {
        ctx.throw(404)
    }
}

const addcollect = async function (ctx) {
    const data = ctx.request.body
    const result = await user.addcollect(data);
    if (result) {
        if(result.info){
            ctx.body = {
                success: false,
                info: result.info
            }
        } else {
            ctx.body = {
                success: 'true',
                info: '收藏成功！'
            }
        }
    } else {
        ctx.throw(404)
    }
}

const addfollow = async function (ctx) {
    const data = ctx.request.body
    const result = await user.addfollow(data);
    if (result) {
        if(result.info){
            ctx.body = {
                success: false,
                info: result.info
            }
        } else {
            ctx.body = {
                success: 'true',
                info: '关注成功！'
            }
        }
    } else {
        ctx.throw(404)
    }
}
// 取消点赞、收藏、关注
const cancellike = async function (ctx) {
    const data = ctx.request.body
    const result = await user.cancellike(data);
    if (result[0]) {
        ctx.body = {
            success: true,
            info: '取消点赞成功'
        }
        
    } else if(result.info) {
        ctx.body = {
            success: false,
            info: result.info
        }
    } else {
        ctx.throw(404)
    }
}

const cancelcollect = async function (ctx) {
    const data = ctx.request.body
    const result = await user.cancelcollect(data);
    if (result[0]) {
        ctx.body = {
            success: true,
            info: '取消收藏成功'
        }
        
    } else if(result.info) {
        ctx.body = {
            success: false,
            info: result.info
        }
    } else {
        ctx.throw(404)
    }
}

const cancelfollow = async function (ctx) {
    const data = ctx.request.body
    const result = await user.cancelfollow(data);
    if (result[0]) {
        ctx.body = {
            success: true,
            info: '取消关注成功'
        }
        
    } else if(result.info) {
        ctx.body = {
            success: false,
            info: result.info
        }
    } else {
        ctx.throw(404)
    }
}

const newReward = async function (ctx) {
    const data = ctx.request.body
    const result = await user.newReward(data);
    if (result) {
        ctx.body = {
            success: true,
            info: '打赏成功！'
        }
        
    } else {
        ctx.throw(404)
    }
}

const searchArticle = async function (ctx) {
    const data = ctx.request.body
    const result = await user.searchArticle(data.keyword);
    ctx.body = {
        success: true,
        result: result,
        info: '打赏成功！'
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
    getHomeData,
    addfollow,
    addlike,
    addcollect,
    cancelfollow,
    cancellike,
    cancelcollect,
    newReward,
    searchArticle
}