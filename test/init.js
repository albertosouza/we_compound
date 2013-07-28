require('should');

global.getApp = function(done) {
    var app = require('compound').createServer()

    app.renderedViews = [];
    app.flashedMessages = {};

    // Monkeypatch app#render so that it exposes the rendered view files
    app._render = app.render;
    app.render = function (viewName, opts, fn) {
        app.renderedViews.push(viewName);

        // Deep-copy flash messages
        var flashes = opts.request.session.flash;
        for(var type in flashes) {
            app.flashedMessages[type] = [];
            for(var i in flashes[type]) {
                app.flashedMessages[type].push(flashes[type][i]);
            }
        }

        return app._render.apply(this, arguments);
    }

    // Check whether a view has been rendered
    app.didRender = function (viewRegex) {
        var didRender = false;
        app.renderedViews.forEach(function (renderedView) {
            if(renderedView.match(viewRegex)) {
                didRender = true;
            }
        });
        return didRender;
    }

    // Check whether a flash has been called
    app.didFlash = function (type) {
        return !!(app.flashedMessages[type]);
    }


    // Fake user login with passport.
    app.mockPassportInitialize = function ( ) {
        var passport = require('passport');
        passport.initialize = function () {
            return function (req, res, next) {

                passport = this;
                passport._key = 'passport';
                passport._userProperty = 'user';
                passport.serializeUser = function(user, done) {
                    return done(null, user.id);
                };
                passport.deserializeUser = function(user, done) {
                    return done(null, user);
                };
                req._passport = {
                    instance: passport
                };
                req._passport.session = {
                    user: new app.models.User({ id: 1, name: 'Joe Rogan' })
                };

                return next();
            };
        };

    };


    return app;
};
