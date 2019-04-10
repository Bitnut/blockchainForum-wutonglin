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
    const newInfo = await user.refreshArticle(data)
    ctx.body = {
        success: true,
        articleData: newInfo,
        info: '文章发布成功！'
    }
}

const getArticleById = async function (ctx) {
  const id = Number(ctx.params.id)
  result = await user.getArticle(id);
  ctx.body = {
        success: true,
        articleData: result,
        info: '获取文章成功！'
  }
}

const removeArticleById = async function (ctx) {
    const result = await user.removeAritcleById(ctx.request.body.aritcleId)
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
    const id = Number(ctx.params.id)
    allArticles = await user.getAllArticles();
    ctx.body = {
        success: true,
        hotArticles: allArticles,
    }
  }

module.exports = {
    getHotArticles,
    newArticle,
    getArticleById,
    removeArticleById,
    addCorpus,
    removeCorpus,
    releaseArticle
}