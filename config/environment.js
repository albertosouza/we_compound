module.exports = function (compound) {

    var express = require('express'),

    mongoStore = require('connect-mongo')(express);

    var flash = require('connect-flash');

    // redis store for session store
    var RedisStore = require("connect-redis")(express);
    var redis = require("redis").createClient();

    var app = compound.app;

    app.configure(function(){
        app.use(flash());
        app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        app.set('cssEngine', 'stylus');
        app.use(express.bodyParser());
        app.use(express.cookieParser('secret'));
        // express/redis session storage
        app.use(express.session({
            secret: 'secret',
            store: new RedisStore({ host: 'localhost', port: 6379, client: redis })
        }));

        app.use(express.methodOverride());
        app.use(app.router);
    });

};
