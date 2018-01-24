var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var User = require('../models/user');
var config = require('../config/database');
var jwt = require('jsonwebtoken');


module.exports = function(app,passport){

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

  passport.serializeUser(function(user, done) {
    /*if(user.active){
      if(user.error){
        token = 'unconfirmed/error';
      }
      else{*/
        token = jwt.sign({username: user.facebook_login,email: user.email},config.secret,{expiresIn:'24h'});
      /*}
    }else{
      token = 'inactive/error';
    }*/
    done(null, user.id);
  });

passport.deserializeUser(function(id, done) {
  User.findById(id,function(err,user) {
    done(err, user);
  });
});

  passport.use(new FacebookStrategy({
      clientID: '139253733413852',
      clientSecret:'47d4b5eefc49d3b106c7e7b4971fafaa',
      callbackURL: "http://localhost:8080/auth/facebook",
      profileFields: ['id', 'displayName', 'email','posts']
    },
    function(accessToken, refreshToken, profile, done) {
      this.id = profile.id;
      console.log(this.id);
      this.access_token = accessToken;
      console.log(this.access_token);

      User.findOne({email:profile._json.email}).select('facebook_login password email').exec(function(err,user){
        if(err) done(err);
        if(user && user != null){
          done(null,user);
        } else {
          done(err);
        }
      });
    }
  ));


// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: 'https://www.facebook.com/login/' }),function(req,res,next){
  //res.json({success:true,msg:'what happened' + this.access_token, facebook_user_id:this.id});
console.log(token);
res.redirect('/facebook/' + token);
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'users_post' }));

  return passport;
}
