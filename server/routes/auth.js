const auth = require('../controller/auth.js'); 
const api = require('../controller/user.js'); 
const router = require('koa-router')();

router.post('/user/login', auth.userLogin);
router.post('/user/signup', auth.userRegistration);
router.get('/homedata', api.getHomeData);

module.exports = router; // 把router规则暴露出去