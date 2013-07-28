load('application');

before(loadUser, {
    only: ['show', 'edit', 'update', 'destroy']
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

action('account', function () {
    this.user = req.user;
    this.title = 'User show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.user});
            break;
        default:
            render();
    }
});

action('accountSettings', function () {
    this.user = req.user;
    this.passwords = {};

    console.log(path_to.account_settings());

    this.title = 'Account settings';
    switch(params.format) {
        case "json":
            send(this.user);
            break;
        default:
            render();
    }
});

// TODO need to implement a better password validation
action('changePassword', function () {

    var err = false;
    var user = req.user;

    if(req.body.confirmpassword == req.body.password){
        if(req.body.oldpassword){
            var oldPassword = req.body.oldpassword;

            // check if old password is correct
            if (!User.verifyPassword(oldPassword, user.password) ){
                err = "<strong>Old password</strong> is wrong";
            }

        } else {
            err = "<strong>Old password</strong> isn't valid";
        }

        if(req.body.password){
            var newPassword = req.body.password;

        } else {
            err = "<strong>New password</strong> isn't valid";
        }

        if(!req.body.confirmpassword){
            err = "The field <strong>Confirm new password</strong> is required";
        }

    }else{
        err = "<strong>New password</strong> and <strong>Confirm new password</strong> are different";
    }

    if(!err){

        User.changePassword(user ,oldPassword ,newPassword ,function(err){
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
                        flash('info', 'Password updated');
                        redirect(path_to.account_settings());
                    } else {
                        flash('error', 'Password can not be updated');
                        render('edit');
                    }
                });
            });
        });

    } else {
        flash('error', err);
        redirect(path_to.account_settings());
        /*
        render('accountSettings', {
            user: user,
            passwords: {
            },
            title: 'New user'
        });
*/
    }


});

action(function create() {
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
    User.all(function (err, users) {
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
    this.title = 'User show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.user});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'User edit';
    switch(params.format) {
        case "json":
            send(this.user);
            break;
        default:
            render();
    }
});

action(function update() {
    var user = this.user;
    console.log('no update');
    this.title = 'Edit user details';
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
});

action(function destroy() {
    this.user.destroy(function (error) {
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
    User.find(params.id, function (err, user) {
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
