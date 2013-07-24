module.exports = function (compound) {

    var express = require('express'),
        mongoStore = require('connect-mongo')(express);

    var app = compound.app;

    app.configure(function(){
        app.use(express.static(app.root + '/public', { maxAge: 86400000 }));
        app.set('jsDirectory', '/javascripts/');
        app.set('cssDirectory', '/stylesheets/');
        app.set('cssEngine', 'stylus');
        app.use(express.bodyParser());
        app.use(express.cookieParser('secret'));
        //app.use(express.session({secret: 'secret'}));
        // express/mongo session storage
        app.use(express.session({
          secret: 'noobjs',
          store: new mongoStore({
            url: 'mongodb://localhost/we_compound',
            collection : 'sessions'
          })
        }));

        app.use(express.methodOverride());
        app.use(app.router);
    });

};
