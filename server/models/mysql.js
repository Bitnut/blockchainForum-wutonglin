const db = require('../config/default') // 引入user的表结构
const usersModel = '../schema/users.js'
const postsModel = '../schema/posts.js'
const ForumDb = db.Forum // 引入数据库

const User = ForumDb.import(usersModel) // 用sequelize的import方法引入表结构，实例化了User。
const Posts = ForumDb.import(postsModel) // 用sequelize的import方法引入表结构，实例化了User。
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
    const result = await Posts.update(
        {
            user_email: newInfo.user_email,
            user_name: newInfo.user_name,                 
            user_phone: newInfo.user_phone,
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
    const newCorpus = await Posts.update(
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
    return newCorpus;
}

// 删除文章

// 根据id删除文章
const removeAritcleById = async function (articleId) {
    const articles = await Posts.destroy(
        {
            where:{
                name: articleId
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


module.exports = {
  getEmail,
  getNickName,
  getPhoneNum,
  newUser,
  getUserInfoByName,
  getUserArticles,
  newArticle,
  refreshArticle,
  getArticle,
  getAllArticles,
  getArticleByUserId,
  refreshCorpus,
  newPassword,
  removeAritcleById,
  removeAritcleByCorpus,
  refreshSettings
}