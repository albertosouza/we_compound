/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/


var Board = describe('Board', function () {
    property('title', String);
    property('description', Text);
    property('createdAt', Date);
    property('active', Boolean, {default: true});
    set('restPath', pathTo.boards);
});

var List = describe('List', function () {
    property('title', String);
    property('description', Text);
    property('createdAt', Date);
    property('active', Boolean, {default: true});
    set('restPath', pathTo.lists);
});

var Task = describe('Task', function () {
    property('title', String);
    property('description', Text);
    property('createdAt', Date);
    property('deadline', Date);
    property('active', Boolean, {default: true});
    set('restPath', pathTo.tasks);
});

/* relations */
Board.hasMany(List,   {as: 'lists'});
List.hasMany(Task,   {as: 'tasks'});

var User = describe('User', function () {
    property('username', String);
    property('displayName', String);
    property('email', String, {required: true}, {index: true });
    property('password', String);
    property('bio', String);
    property('googleId', String, {index: true} );
    property('githubId', String, {index: true} );
    property('linkedinId', String, {index: true} );
    property('createdAt', Date);
    property('activated', Boolean, {default: true} );
    set('restPath', pathTo.users);
});

