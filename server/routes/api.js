const api = require('../controller/user.js'); 
const router = require('koa-router')();

router.post('/user/newarticle', api.newArticle);
router.post('/user/releaseArticle', api.releaseArticle);
router.get('/articles', api.getHotArticles);
router.get('/article/:id', api.getArticleById);
router.post('/changesettings', api.changeSettings);
router.post('/user/deletearticle', api.removeArticleById);
router.post('/user/savearticle', api.saveArticle);
router.get('/getcomment/:id',api.getCommentById);
router.post('/newcomment',api.addComment);

module.exports = router; // 把router规则暴露出去