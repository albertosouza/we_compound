module.exports = function (compound, User) {
    // define User here
    var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

    //- PROTOTyPES -//
    User.prototype.setPassword = function (password, done) {
        var _this = this;

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return done(err);

            // hash the password along with our new salt
            bcrypt.hash(password, salt, function(err, crypted) {
                _this.cryptedPassword = crypted;
                done();
            });
        });
    };

    User.prototype.getName = function (){
        if( this.displayName ){
            return this.displayName;
        }
        return this.username;
    };

    //- Methods -//
    User.schema.pre('save', function (next) {
        if (!this.createdAt){
          this.createdAt = new Date();
        } else {
          this.updatedAt = new Date();
        }
        next();
    });

    // get user by email
    User.getUserByEmail = function (email){
        if (email) {
            User.findOne({
                'email': email
            }, function (err, user) {
                if (user) return user;
                if (!user) return false;
            });
        } else {
            return false;
        }
    };

    // verify user password
    User.verifyPassword = function (password, cryptedPassword) {

        var isMatch = bcrypt.compareSync(password, cryptedPassword);
        return isMatch;
    };

    User.changePassword = function(user, oldPassword, newPassword, next){

        user.updateAttribute( 'password', newPassword , function (err) {
            console.log('travo');
            if (!err) {
                next();
            } else {
                next(err);
            }
        });

    };

  User.findOrCreate = function (data, done) {

    /* GITHUB */
    if (data.githubId) {
        User.findOne({ 'githubId': data.githubId }, function (err, user) {
            if (user) return done(err, user);
            User.create({
                githubId: data.githubId,
                displayName: data.profile.displayName || data.profile.username
            }, done);
        });
    } else

    /* GOOGLE OPENID */
    if (data.openId) {

        var email = data.profile.emails[0].value;

        User.findOne({ $or: [ {'googleId': data.openId}, {'email': email } ] }, function (err, user) {
            if(!user.googleId){
                user.googleId = data.openId;
            }

            if (user) return done(err, user);
            User.create({
                displayName: data.profile.displayName,
                email: data.profile.emails[0].value,
                googleId: data.openId
            }, done);
        });
    } else

    /* LINKEDIN */
    if (data.linkedinId) {
        User.findOne({ 'linkedinId': data.linkedinId }, function (err, user) {
            if (user) return done(err, user);
            User.create({
                displayName: data.profile.displayName,
                linkedinId: data.linkedinId
            }, done);
        });
    } else

    /* LOCAL */
    if (data.email) {
        User.findOne({ 'email': data.email }, function (err, user) {
            if (user) return done(err, user);
            if (!user) return done(err);
        });
    } else

    /* SOMETHING NOT KNOWN YET */
    {
        console.log(data.profile);
    }
  };

    //TODO

    User.failedLogin = {
        NOT_FOUND: 0,
        PASSWORD_INCORRECT: 1,
        MAX_ATTEMPTS: 2
    };

    User.incLoginAttempts = function(cb) {
        // if we have a previous lock that has expired, restart at 1
        if (this.lockUntil && this.lockUntil < Date.now()) {
            return this.update({
                $set: { loginAttempts: 1 },
                $unset: { lockUntil: 1 }
            }, cb);
        }
        // otherwise we're incrementing
        var updates = { $inc: { loginAttempts: 1 } };
        // lock the account if we've reached max attempts and it's not locked already
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
            updates.$set = { lockUntil: Date.now() + LOCK_TIME };
        }
        return this.update(updates, cb);
    };

};
