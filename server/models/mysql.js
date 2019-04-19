const db = require('../config/default') // 引入user的表结构
const usersModel = '../schema/users.js'
const postsModel = '../schema/posts.js'
const commentsModel = '../schema/comments.js'
const ForumDb = db.Forum // 引入数据库

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const User = ForumDb.import(usersModel)
const Posts = ForumDb.import(postsModel)
const Comment = ForumDb.import(commentsModel)
// 登录时返回所有用户信息
const getUserInfoByName = async function (nickName) { 
  const userInfo = await User.findOne({
    where: {
      user_name: nickName
    }
  })
  return userInfo
}
const getUserArticles = async function (userId) {
    const userArticles = await Posts.findAll({
        where: {
            author_id: userId
        }
      })
      return userArticles
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
  const time = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();
  const Info = await User.create(
    {
      user_id: null,
      user_email: userInfo.email,
      user_name: userInfo.nickName,
      user_pass: userInfo.password,                    
      user_phone: userInfo.phoneNum,
      user_avatar: '../../assets/smallBanner.jpg',
      user_gender: 'secret',
      signup_moment: time,
      user_editor: 'rich',
      email_message: 'no',
      user_corpus: '默认文集',
      self_introduction: '这个人很懒，还没有写自我介绍',
      reward_setting: 'yes',
      reward_number: 3,
    }
  )
  return Info
}
// 以下是用户文章的增删改查

// 根据文章 ID 获取文章
const getArticle = async function (id){
  const article = await Posts.findOne(
    {
      where: {
        post_id: id
      },
    }
  )
  return article
}
// 获取文章时，排除未发布的文章
const getReleasedArticle = async function (id){
    const article = await Posts.findOne(
      {
        where: {
          post_id: id,
          [Op.not]: [
            { release_status: 'no' },
          ]
        },
      }
    )
    return article
  }
// 根据用户 ID 获取文章
const getArticleByUserId = async function (userId){
    const articles = await Posts.findAll(
      {
        where: {
            author_id: userId
        }
      }
    )
    return articles
}
// fix！ 返回用于首页或发现的文章
const getAllArticles = async function () {
    const articles = await Posts.findAll(
        {
            where: {
                release_status: 'yes'
            }
        }
    );
    return articles;
}

// 更新作者的文集信息，用于用户写作页面的修改
const refreshCorpus = async function ( userId, newInfo) {
    const newCorpus = await Posts.update(
        {
            corpus: newInfo
        },
        {
            where: {
                user_id: userId
            }
        }
    );
    return newCorpus;
}


const refreshSettings = async function ( newInfo) {
    const result = await User.update(
        {
            user_gender: newInfo.user_gender,
            user_editor: newInfo.user_editor,
            email_message: newInfo.email_message,
            self_introduction: newInfo.self_introduction,
            reward_setting: newInfo.reward_setting,
            reward_number: newInfo.reward_number,
        },
        {
            where: {
                user_id: newInfo.user_id
            }
        }
    );
    return result;
}

// 新增文章
const newArticle = async function (articleInfo){  
    const time = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();
    const Info = await Posts.create(
      {
        post_id: null,
        author_id: articleInfo.authorId,
        post_title: articleInfo.title,
        corpus_tag: articleInfo.corpus,
        release_status: articleInfo.release_status,
        post_content_raw: articleInfo.rawContent,                    
        post_content_html: articleInfo.htmlContent,
        post_moment: time,
        post_views: 0,
        post_likes: 0,
        post_comments: 0,
      }
    )
    return Info
}
const refreshArticle = async function ( articleInfo) {
    const newArticle = await Posts.update(
        {
            post_title: articleInfo.title,
            release_status: articleInfo.release_status,
            post_content_raw: articleInfo.rawContent,                
            post_content_html: articleInfo.htmlContent,
        },
        {
            where: {
                post_id: articleInfo.postId
            }
        }
    );
    return newArticle;
}

const saveArticle = async function ( articleInfo) {
    const newArticle = await Posts.update(
        {
            post_title: articleInfo.title,
            post_content_raw: articleInfo.rawContent,                
            post_content_html: articleInfo.htmlContent,
        },
        {
            where: {
                post_id: articleInfo.postId
            }
        }
    );
    return newArticle;
}

// 删除文章

// 根据id删除文章
const removeAritcleById = async function (articleId) {
    const articles = await Posts.destroy(
        {
            where:{
                post_id: articleId
            }
        }
    );
}

// 根据文集名称删除文章
const removeAritcleByCorpus = async function (userId, corpus) {
    const newCorpus = await Posts.destroy(
        {
            where:{
                corpus_tag: corpus,
                user_Id: userId
            }
        }
    );
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

// 评论操作

const countCommentFloor = async function (newComment) {
    if (newComment.parent_id === '') {
        var result1 = await Comment.count({
            where: {
                post_id: newComment.post_id,
                parent_id: '',
            }
        }
        )
        return ++result1
    } else {
        var result2 = await Comment.count({
            where: {
                post_id: newComment.post_id,
                parent_id: newComment.parent_id
            }
        }
        )
        return ++result2
    }
}

const addNewComment = async function (newComment) {
    const floor = await countCommentFloor(newComment);
    const comment = await Comment.create(
        {
            id: null,
            post_id: '1',
            parent_id: newComment.parent_id,
            user_name: newComment.user_name,
            content: newComment.content,
            format_time: newComment.format_time,
            time_string: newComment.time_string,
            floor: floor,
            likes: 0
        }
    )
    return comment

    
    
}

const getCommentList = async function (Id) {
    const result = await Comment.findAll(
        {
            where: {
                post_id: Id
            }
        }
    )
    const commentList = []
    const replyList = []
    const length = result.length;
    for(var i=0; i<length; i++) {
        if(result[i].parent_id === '') {
            commentList.push(
                {
                    id: result[i].id,
                    post_id: result[i].post_id,
                    parent_id: '',
                    user_name: result[i].user_name,
                    content: result[i].content,
                    format_time: result[i].format_time,
                    time_string: result[i].time_string,
                    floor: result[i].floor,
                    likes: result[i].likes,
                    replyList: []
                }
            )
        } else {
            replyList.push(
                {
                    parent_id: result[i].parent_id,
                    reply: {
                        id: result[i].id,
                        post_id: result[i].post_id,
                        parent_id: result[i].parent_id,
                        user_name: result[i].user_name,
                        content: result[i].content,
                        format_time: result[i].format_time,
                        time_string: result[i].time_string,
                        floor: result[i].floor,
                        likes: result[i].likes,
                    }
                }
            )
        }
    }
    for(var i=0; i<replyList.length; i++) {
        for(var k=0; k<commentList.length; k++) {
            if (replyList[i].parent_id === commentList[k].id.toString()) {
                commentList[k].replyList.push(replyList[i].reply)
                break;
            }
        }
    }
    return commentList;
}









module.exports = {
  getEmail,
  getNickName,
  getPhoneNum,
  newUser,
  getUserInfoByName,
  getUserArticles,
  newArticle,
  refreshArticle,
  saveArticle,
  getArticle,
  getReleasedArticle,
  getAllArticles,
  getArticleByUserId,
  refreshCorpus,
  newPassword,
  removeAritcleById,
  removeAritcleByCorpus,
  refreshSettings,
  addNewComment,
  getCommentList
}