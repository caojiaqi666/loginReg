const Koa = require('koa')
const app = new Koa
const router = require('koa-router')()
const views = require('koa-views')
const koaStatic = require('koa-static')
const koaBody = require('koa-body')
const UserInfo = require("./mongo/mongo")
const {
  resolve
} = require('path')

// 加载views【模板渲染工具】到app
app.use(views(resolve(__dirname, "./views"), {
  extension: "pug"
  // 指定摸板引擎类型
}));

// 注册静态处理
app.use(koaStatic(resolve(__dirname, "./static")))

app.use(koaBody())

// 注册对应路由
router.get("/", async ctx => {
  await ctx.render("index");
})

router.get("/login", async ctx => {
  await ctx.render("login");
})

router.get("/reg", async ctx => {
  await ctx.render("reg");
})

router.post("/login", async ctx => {
  let {
    username,
    passwd
  } = ctx.request.body;
  let exists = await UserInfo.find({
    userName: username
  })

  if (exists.length === 0) {
    ctx.body = {
      msg: "用户名不存在，请先注册",
      userInfo: -1
    }
  } else {
    if (exists[0].passWord === passwd) {
      ctx.body = {
        msg: "登录成功",
        userInfo: exists[0]
      }
      // 前端使用cookie，后端使用session或token

    } else {
      ctx.body = {
        msg: "密码错误",
        userInfo: -1
      }
    }
  }
})

router.post("/reg", async ctx => {
  let {
    username,
    passwd
  } = ctx.request.body;
  let exists = await UserInfo.find({
    userName: username
  })
  if (exists.length !== 0) {
    ctx.body = {
      msg: "该用户名已经被注册了~"
    }
    return
  } else {
    let user = new UserInfo({
      userName: username,
      passWord: passwd
    })
    let r = await user.save()
    if (r) {
      ctx.body = {
        msg: "注册成功",
        r
      }
    }
  }
})



// 将router挂载到app上
app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(4000)