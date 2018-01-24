const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User schema
const UserSchema = mongoose.Schema({
  email:{
    type:String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  username:{
    type:String,
    lowercase: true,
    required: true
  },
  active:{
    type:Boolean,
    required: true,
    default:false
  }

});

const User1 = module.exports = mongoose.model('User1', UserSchema);
