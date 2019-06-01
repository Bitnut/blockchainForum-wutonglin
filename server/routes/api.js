const api = require('../controller/user.js'); 
const router = require('koa-router')();

router.post('/user/newarticle', api.newArticle);
router.post('/user/releaseArticle', api.releaseArticle);
router.get('/articles', api.getHotArticles);
router.post('/article/:id', api.getArticleById);
router.post('/changesettings', api.changeSettings);
router.post('/user/deletearticle', api.removeArticleById);
router.post('/user/savearticle', api.saveArticle);
router.get('/getcomment/:id',api.getCommentById);
router.post('/newcomment',api.addComment);
router.post('/uploadpicture/:username',api.changeAvatar);
router.get('/visit/:id',api.getUserInfoById);
router.post('/newlike',api.addlike);
router.post('/newcollect',api.addcollect);
router.post('/newfollow',api.addfollow);
router.post('/cancellike',api.cancellike);
router.post('/cancelcollect',api.cancelcollect);
router.post('/cancelfollow',api.cancelfollow);
router.post('/newreward',api.newReward);
router.post('/search',api.searchArticle);


module.exports = router; // 把router规则暴露出去