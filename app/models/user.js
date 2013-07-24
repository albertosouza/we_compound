module.exports = function (compound, User) {
  // define User here



  // verify user password
  User.verifyPassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function(err, isMatch){
      callback(err, isMatch);
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


};
