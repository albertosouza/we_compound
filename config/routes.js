exports.routes = function (map) {

    // users
    map.resources('users');
    map.get('login', 'users#login');
    map.get('signup', 'users#new');
    map.get('logout', 'users#logout');
    map.get('account', 'users#account', ensureAuthenticated);


    map.resources('boards');

    map.resources('lists');

    map.resources('tasks');

    // Generic routes. Add all your routes below this line
    map.root('boards#index');

    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};

// check if user is authenticated
function ensureAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}