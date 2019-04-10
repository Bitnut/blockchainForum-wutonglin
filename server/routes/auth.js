const auth = require('../controller/auth.js'); 
const router = require('koa-router')();

router.post('/user/login', auth.userLogin);
router.post('/user/signup', auth.userRegistration);


module.exports = router; // 把router规则暴露出去