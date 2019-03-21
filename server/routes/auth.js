const auth = require('../controller/user.js'); 
const router = require('koa-router')();

router.post('/user/login', auth.userLogin); // 定义url的参数是id,用user的auth方法引入router
router.post('/user/signup', auth.userRegistration);

module.exports = router; // 把router规则暴露出去