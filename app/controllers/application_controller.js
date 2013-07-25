before('protect from forgery', function () {
  protectFromForgery('27d24dd78c2f8c8c2d762e2908409f227a655032');
});


before(function requireManager() {

    if (!session.passport.user) {
        console.log('deslogado');
        req.session.redirect = req.path;
        next();
        //redirect('/auth/google');
    } else {
        User.find(session.passport.user, function (err, user) {
            if (user && user.email === 'alberto.souza.99@gmail.com') {
                req.user = user;
                next();
            } else {
                flash('error', 'You have no permission to access this area');
                console.log('sem permissão');
                //redirect('/');
                next();
            }
        });
    }
});




