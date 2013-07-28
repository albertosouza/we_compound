module.exports = function (compound, User) {
  // define User here
    var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

    User.beforeCreate = function(next, data) {
        data.createdAt = new Date();
        next();
    };

    User.beforeSave = function(next, data) {
        var user = this;

        user.passwordIsModified(
            function (){
                // generate a salt
                bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
                    if (err) return next(err);

                    // hash the password along with our new salt
                    bcrypt.hash(data.password, salt, function(err, hash) {
                        if (err)  return next(err);

                        // override the cleartext password with the hashed one
                        data.password = hash;

                        return next();
                    });
                });

            },
            function (){
                return next();
            }


        );


    };

    // get user by email
    User.getUserByEmail = function (email){
        if (email) {
            User.all({
                where: {
                    email: email
                }, limit: 1
            }, function (err, user) {
                console.log(user);
                if (user[0]) return user[0];
                if (!user[0]) return false;
            });
        } else {
            return false;
        }

    };

    // verify user password
    User.verifyPassword = function (password, hash) {
        var isMatch = bcrypt.compareSync(password, hash);
        return isMatch;
    };

    // @TODO needs more work in this test
    User.prototype.passwordIsModified = function (nextIsModified, nextIsSame) {
        var newUser = this;

        User.all({
            where: {
                email: newUser.email
            }, limit: 1
        }, function (err, user) {

            // if user is new
            if(!user[0])  nextIsModified();

            // if is update
            if( user[0].password != newUser.password  ){
                nextIsModified();
            }else{
                nextIsSame();
            }
        });

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
        User.all({
            where: {
                githubId: data.githubId
            }, limit: 1
        }, function (err, user) {
            if (user[0]) return done(err, user[0]);
            User.create({
                githubId: data.githubId,
                displayName: data.profile.displayName || data.profile.username
            }, done);
        });
    } else

    /* GOOGLE OPENID */
    if (data.openId) {
        User.all({
            where: {
                googleId: data.openId
            }, limit: 1
        }, function (err, user) {
            if (user[0]) return done(err, user[0]);
            User.create({
                displayName: data.profile.displayName,
                email: data.profile.emails[0].value,
                googleId: data.openId
            }, done);
        });
    } else

    /* LINKEDIN */
    if (data.linkedinId) {
        User.all({
            where: {
                linkedinId: data.linkedinId
            }, limit: 1
        }, function (err, user) {
            if (user[0]) return done(err, user[0]);
            User.create({
                displayName: data.profile.displayName,
                linkedinId: data.linkedinId
            }, done);
        });
    } else

    /* LOCAL */
    if (data.email) {
        User.all({
            where: {
                email: data.email
            }, limit: 1
        }, function (err, user) {
            if (user[0]) return done(err, user[0]);
            if (!user[0]) return done(err);
        });
    } else

    /* SOMETHING NOT KNOWN YET */
    {
        console.log(data.profile);
    }
  };

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
