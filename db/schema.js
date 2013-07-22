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

var Task = describe('Task', function () {
    property('title', String);
    property('description', Text);
    property('createdAt', Date);
    property('deadline', Date);
    property('active', Boolean, {default: true});
    set('restPath', pathTo.tasks);
});

var List = describe('List', function () {
    property('title', String);
    property('description', Text);
    property('createdAt', Date);
    property('active', Boolean, {default: true});
    set('restPath', pathTo.lists);
});

var Board = describe('Board', function () {
    property('title', String);
    property('description', Text);
    property('createdAt', Date);
    property('active', Boolean, {default: true});
    set('restPath', pathTo.boards);
});

