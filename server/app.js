const Koa = require ('koa')
const json = require ( 'koa-json')
const logger = require ( 'koa-logger')
const auth = require ( './routes/auth.js')
//const api = require ( './server/routes/api.js')
const jwt = require ( 'koa-jwt')
const path = require ( 'path')
const serve = require ( 'koa-static')
const historyApiFallback = require ( 'koa2-history-api-fallback')
const koaRouter = require ( 'koa-router')
const koaBodyparser = require ( 'koa-bodyparser')




const app = new Koa()
const router = koaRouter()

let port = process.env.PORT

app.use(koaBodyparser({
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  }}
))
app.use(json())
app.use(logger())

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async function (ctx, next) {  //  如果JWT验证失败，返回验证失败信息
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

router.use('/auth', auth.routes()) // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
//router.use('/api', api.routes()) // 所有走/api/打头的请求都需要经过jwt验证。

app.use(router.routes()) // 将路由规则挂载到Koa上。
app.use(historyApiFallback())
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.listen(8889, () => {
  console.log(`Koa is listening in 8889`)
})

module.exports = app;