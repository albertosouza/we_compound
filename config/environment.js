module.exports = function (compound) {

    var express = require('express'),

    mongoStore = require('connect-mongo')(express);

    var flash = require('connect-flash');

    var app = compound.app;

    require('./mongoose').init(compound);

    app.configure(function(){
        app.use(flash());
        app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        app.set('cssEngine', 'stylus');
        app.use(express.bodyParser());
        app.use(express.cookieParser('secret'));
        // express/mongo session storage
        app.use(express.session({
            secret: 'secret',
            store: new mongoStore({
                url: 'mongodb://localhost/we_compound',
                collection : 'sessions',
                auto_reconnect: true
            })
        }));
        app.set('defaultLocale', 'en');
        app.use(express.methodOverride());
        app.use(app.router);
    });

};
