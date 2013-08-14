load('application');

before(loadUser, {
    only: ['show', 'edit', 'update', 'destroy', 'changePassword']
});

action('new', function () {
    this.title = 'New user';
    this.user = new User;
    render();
});

action('login', function () {
    this.title = 'New user';
    this.user = new User;
    render();
});


action('signup', function () {
    this.title = 'Sign up';
    this.user = new User;
    render();
});


action('logout', function () {
    req.logout();
    res.redirect('/');
});

// TODO need to implement a better password validation
action('changePassword', function () {
    var err = false;
    var user = this.user;

    var newPassword = null;
    var oldPassword = null;

    if(req.body.password){
        newPassword = req.body.password;

        if(typeof req.body.oldpassword !== 'undefined'){
            oldPassword = req.body.oldpassword;

            // dont have a password then pass validation
            if(user.cryptedPassword){
                // check if old password is correct
                if (!User.verifyPassword(oldPassword, user.cryptedPassword) ){
                    err = "<strong>Old password</strong> is wrong";
                }
            }


        } else {
            err = "<strong>Old password</strong> isn't valid";
        }

    } else {
        err = "<strong>New password</strong> isn't valid";
    }


    if(!req.body.confirmpassword){
        err = "The field <strong>Confirm new password</strong> is required";
    }

    if(req.body.confirmpassword != req.body.password){
        err = "<strong>New password</strong> and <strong>Confirm new password</strong> are different";
    }

    if(!err){

        user.setPassword( newPassword, function(err){
            if(err){
                flash('error', err);
                redirect(path_to.edit_user(req.user));
            }

            user.save( function (err, user, numberAffected) {

                respondTo( function (format) {
                    format.json(function () {
                        if (err) {
                            send({code: 500, error: user && user.errors || err});
                        } else {
                            send({code: 200, data: user});
                        }
                    });
                    format.html(function () {
                        if (!err) {
                            flash('info', 'Password updated');
                            redirect(path_to.edit_user(user));
                        } else {
                            flash('error', 'Password can not be updated');
                            render('edit');
                        }
                    });
                });
            });
        });


    } else {
        flash('error', err);
        redirect(path_to.edit_user(req.user));
    }
});

/* update user avatar */
action(function updateAvatar(){
    console.log(req.user);
    console.log(req.params.user_id);

    var tmpFile = req.files.file;

    User.findOne({ where: { id: req.params.user_id } } , function(err, user){
        if(err){
            console.log(err);
            return send({code: 500, error: err});
        }

        var avatar = new Image();

        avatar.upload(tmpFile , function (err) {
            if (err) {
                console.log(err);
                this.title = 'New file';
                flash('error', 'File can not be created');
                return render('new');
            } else {
                flash('info', 'File created');
            }

            avatar.creator(req.user.id);

            // set avatar assoc
            avatar.creator(user.id);
            // now create

            avatar.save( function (err, image) {

                respondTo(function (format) {
                    format.json(function () {
                        if (err) {
                            send({code: 500, error: avatar && avatar.errors || err});
                        } else {
                            send({code: 200, data: avatar.toObject()});
                        }
                    });
                    format.html(function () {
                        if (err) {
                            flash('error', 'User avatar can not be created');
                            render('new', {
                                user: user,
                                title: 'User avatar'
                            });
                        } else {
                            flash('info', 'User avatar changed');
                            redirect(path_to.user(user));
                        }
                    });
                });
            });

        });

    });

    console.log('no update');
    console.log(req.params.id);
    this.title = 'Update avatar';
    /*
    this.user.updateAttributes(body.User, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: user && user.errors || err});
                } else {
                    send({code: 200, data: user});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'User updated');
                    redirect(path_to.user(user));
                } else {
                    flash('error', 'User can not be updated');
                    render('edit');
                }
            });
        });

    });
*/

});

action(function create() {

    var user = new User();
    /*
    if(req.body.User){
        user.username = req.body.User.username;
        user.displayName = req.body.User.displayName;
        user.email = req.body.User.email;
        user.password = req.body.User.password;
        user.bio = req.body.User.bio;
    }
*/
    User.create(req.body.User, function (err, user) {
        user.provider = 'local';
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: user && user.errors || err});
                } else {
                    send({code: 200, data: user.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'User can not be created');
                    render('new', {
                        user: user,
                        title: 'New user'
                    });
                } else {
                    flash('info', 'User created');
                    redirect(path_to.users);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Users index';
    User
        .find()
        .limit(10)
        //.sort('-createdAt')
        .exec( function (err, users) {
            switch (params.format) {
                case "json":
                    send({code: 200, data: users});
                    break;
                default:
                    render({
                        users: users
                    });
            }
    });
});

action(function show() {
    this.title = 'User account';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.user});
            break;
        default:
            render();
    }


});

action(function edit() {
    this.title = 'User settings';

    switch(params.format) {
        case "json":
            send(this.user);
            break;
        default:
            render();
    }
});

action(function update() {
    this.title = 'Edit user details';

    var user = this.user;

    // set vars
    if( body.User ){
        if( body.User.displayName ) user.displayName = body.User.displayName;
        if( body.User.email ) user.email = body.User.email;
        if( body.User.username ) user.username = body.User.username;
        if( body.User.bio ) user.bio = body.User.bio;
    }

    // save
    user.save( function (err, user, numberAffected) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: user && user.errors || err});
                } else {
                    send({code: 200, data: user});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'User updated');
                    redirect(path_to.user(user));
                } else {
                    flash('error', err.code + ': ' + err.err );
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.user.remove(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy user');
                } else {
                    flash('info', 'User successfully removed');
                }
                send("'" + path_to.users + "'");
            });
        });
    });
});

function loadUser() {
    User.findOne({ '_id': params.id }, function (err, user) {
        if (err || !user) {
            if (!err && !user && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.users);
        } else {
            this.user = user;
            next();
        }
    }.bind(this));
}
