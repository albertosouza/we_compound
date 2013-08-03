exports.routes = function (map) {
    map.resources('posts');

    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

    // users
    map.resources('users', function (user) {
        user.get('avatar', 'users#showAvatar');
        user.put('avatar', 'users#updateAvatar');

        user.resources('images');
    });
    map.get('login', 'users#login');
    map.get('signup', 'users#signup');
    map.get('logout', 'users#logout');
    map.put('/users/:id/password.:format?', 'users#changePassword');

    // board services routes
    map.resources('boards');

    map.resources('lists');

    map.resources('tasks');

    //galleries routes
    map.resources('galleries');
    map.resources('images', {path: 'img'});

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