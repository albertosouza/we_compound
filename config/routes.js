exports.routes = function (map) {
    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

    // users
    map.resources('users');
    map.get('login', 'users#login');
    map.get('signup', 'users#signup');
    map.get('logout', 'users#logout');
    map.get('account/settings', 'users#accountSettings', ensureAuthenticated);

    map.put('account/settings/password', 'users#changePassword', ensureAuthenticated);


    // board services routes
    map.resources('boards');

    map.resources('lists');

    map.resources('tasks');

    //galleries routes
    map.resources('galleries');
    map.resources('images');

    //map.post('galleries/images/new', 'galleries#newImage');

    // root or home route
    map.root('boards#index');

    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};

// @TODO need to implement authorization logic and file for this
// check if user is authenticated
function ensureAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}