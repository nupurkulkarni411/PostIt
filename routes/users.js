const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

//Register
router.post('/register',(req,res,next)=>{
  //logic to add new user
  let newUser = new User({
    email:req.body.email,
    password:req.body.password,
    facebook_login: req.body.facebook_login,
    twitter_login: req.body.twitter_login
  });

  User.addUser(newUser,(err,user)=>{
    if(err){
      res.json({success:false, msg:'Failed to add user'});
    }
    else{
      res.json({success:true, msg:'User added successfully'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.email;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            email: user.email,
            facebook_login: user.facebook_login,
            twitter_login: user.twitter_login
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
