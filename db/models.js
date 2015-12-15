var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
  User: {
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String, required: true}
  }
};