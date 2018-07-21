var router = require('express').Router();
var Model = require('./modules');

// 所有请求都要经过这一步，统一请求返回的数据格式
var responseData;
router.use(function (req, res, next){
  console.log('********00*************', req.body);
  responseData = {
    code: 0,
    message: ''
  }
  next();
});

var date = new Date(),
  yy = date.getFullYear(),
  MM = date.getMonth() + 1,
  dd = date.getDate(),
  hh = date.getHours(),
  mm = date.getMinutes(),
  ss = date.getSeconds();

// 登录
router.post('/userLogin', function (req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  Model.User.findOne({username: username, password: password}).
  then(function(userInfo){
    console.log('-----1------>', userInfo);
    if(!userInfo){
      responseData.code = 1;
      responseData.message = '用户名或密码错误.';
      // res.set('Content-Type','application/json');
      res.type('application/json');
      res.json(responseData);
      return;
    }else{
      responseData.code = 200;
      responseData.message ='登录成功';
      responseData.userInfo = {
        _id: userInfo._id,
        username: userInfo.username,
        isAdmin: userInfo.isAdmin
      }
      res.cookie('userInfo', {
        _id: userInfo._id,
        username: userInfo.username,
        isAdmin: userInfo.isAdmin
      }, {maxAge: 1000*60*60});
      res.cookie('isAdmin',userInfo.isAdmin, {maxAge: 1000*60*60});
      // res.set('Content-Type','application/json');
      res.type('application/json');
      res.json(responseData);
      return;
    }
  })
});

// 注册
router.post('/userRegist', function(req, res, next){
  var username =  req.body.username; // req.query.username;
  var password =  req.body.password;
  var newUser = {
    username: username,
    password: password,
    time : date
  };
  console.log('-----2------>', req.body, req.query.username, newUser);

  Model.User.findOne({username: username}).then(function(userInfo){
    if(userInfo){
      responseData.code = 1;
      responseData.message ='用户名已被注册';
      res.json(responseData);
      return;
    }
    if (!username && !password) {
      res.status(400).json({'code': 400, 'msg': '请填写注册的用户名和密码'});
      return;
    }
    Model.User.create(newUser).then(function(newUserInfo){
      responseData.code = 200;
      responseData.message = '账号'+ username +'注册成功';
      res.json(responseData);
    })
  })
});

// 退出
router.get('/logout', function (req, res, next){
  res.clearCookie('userInfo');
  res.clearCookie('isAdmin');
  responseData.code = 200;
  responseData.message = '退出成功';
  res.json(responseData);
});

// 检查是否登录
exports.checkLogin = function(req, res, next){
  if(req.cookies.userInfo){
    responseData.code = 200;
    responseData.message = req.cookies.userInfo;
    res.json(responseData);
  }else{
    responseData.code = '3';
    responseData.message = '没有登录';
    res.json(responseData);
    return;
  }
};
module.exports = router;
