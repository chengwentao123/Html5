var mongoose = require('mongoose');
var db_url = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(db_url);

const Schema = mongoose.Schema;

// 用户
var usersSchema = new Schema({
  username: String,
  password: String,
  isAdmin:{
    type: Boolean,
    default: false
  },
  time: {
    type: String,
    default: Date.now()
  }
});

const db = mongoose.connection;
db.on('connected', function() {
  console.log('Mongoose connection open to ' + db_url);
});

db.on('error', function (err) {
  console.log('Database connection error.', err);
});

db.once('open', function (err) {
  console.log('Mongoose connection successed');
});

db.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

module.exports = {
  User: mongoose.model('User', usersSchema)
};
