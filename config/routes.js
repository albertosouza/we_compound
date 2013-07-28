exports.routes = function (map) {

    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

    // users
    map.resources('users');
    map.get('login', 'users#login');
    map.get('signup', 'users#signup');
    map.get('logout', 'users#logout');
    map.get('account', 'users#account', ensureAuthenticated);
    map.get('account/settings', 'users#accountSettings', ensureAuthenticated);

    map.put('account/settings/password', 'users#changePassword', ensureAuthenticated);

    map.resources('boards');

    map.resources('lists');

    map.resources('tasks');

    // Generic routes. Add all your routes below this line
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