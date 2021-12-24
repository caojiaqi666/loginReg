const Koa = require('koa')
const app = new Koa
const router = require('koa-router')()

const views = require('koa-views')
const {
  resolve
} = require('path')

// 加载views【模板渲染工具】到app
app.use(views(resolve(__dirname, "./views"), {
  extension: "pug"
  // 指定摸板引擎类型
})); 

// 绝对路径
console.log(resolve(__dirname, "./views"));


// 注册对应路由
router.get("/", async ctx => {
  await ctx.render("index", {
    route: "根路由",
    friends: 0
  });
})

router.get("/home", async ctx => {

  await ctx.render("index", {
    route: "home路由",
    friends: 9
  });
})

router.get("/test", async ctx => {

  await ctx.render("index", {
    route: "test路由",
    friends: 1
  });
})

// pug不需要导入
// app.use(async ctx => {
//   await ctx.render("index.pug")
// } )


// 将router挂载到app上
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(4000)