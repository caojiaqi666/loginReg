const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/userInfo", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) { 
    console.log(err);
    return
  }
  console.log("数据库连接成功");
})

const UserInfoSchema = new mongoose.Schema({
  userName: String,
  passWord: String,
}, {
  versionKey: false,
  createAt: "createTime"
})

const UserInfo = mongoose.model("users", UserInfoSchema)

module.exports = UserInfo