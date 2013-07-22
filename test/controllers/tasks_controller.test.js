var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function TaskStub () {
    return {
        title: '',
        description: '',
        createdAt: '',
        deadline: '',
        active: ''
    };
}

describe('TaskController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /tasks/new
     * Should render tasks/new.ejs
     */
    it('should render "new" template on GET /tasks/new', function (done) {
        request(app)
        .get('/tasks/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/tasks\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /tasks
     * Should render tasks/index.ejs
     */
    it('should render "index" template on GET /tasks', function (done) {
        request(app)
        .get('/tasks')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/tasks\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /tasks/:id/edit
     * Should access Task#find and render tasks/edit.ejs
     */
    it('should access Task#find and render "edit" template on GET /tasks/:id/edit', function (done) {
        var Task = app.models.Task;

        // Mock Task#find
        Task.find = sinon.spy(function (id, callback) {
            callback(null, new Task);
        });

        request(app)
        .get('/tasks/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Task.find.calledWith('42').should.be.true;
            app.didRender(/tasks\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /tasks/:id
     * Should render tasks/index.ejs
     */
    it('should access Task#find and render "show" template on GET /tasks/:id', function (done) {
        var Task = app.models.Task;

        // Mock Task#find
        Task.find = sinon.spy(function (id, callback) {
            callback(null, new Task);
        });

        request(app)
        .get('/tasks/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Task.find.calledWith('42').should.be.true;
            app.didRender(/tasks\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /tasks
     * Should access Task#create when Task is valid
     */
    it('should access Task#create on POST /tasks with a valid Task', function (done) {
        var Task = app.models.Task
        , task = new TaskStub;

        // Mock Task#create
        Task.create = sinon.spy(function (data, callback) {
            callback(null, task);
        });

        request(app)
        .post('/tasks')
        .send({ "Task": task })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Task.create.calledWith(task).should.be.true;

            done();
        });
    });

    /*
     * POST /tasks
     * Should fail when Task is invalid
     */
    it('should fail on POST /tasks when Task#create returns an error', function (done) {
        var Task = app.models.Task
        , task = new TaskStub;

        // Mock Task#create
        Task.create = sinon.spy(function (data, callback) {
            callback(new Error, task);
        });

        request(app)
        .post('/tasks')
        .send({ "Task": task })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Task.create.calledWith(task).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /tasks/:id
     * Should redirect back to /tasks when Task is valid
     */
    it('should redirect on PUT /tasks/:id with a valid Task', function (done) {
        var Task = app.models.Task
        , task = new TaskStub;

        Task.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/tasks/1')
        .send({ "Task": task })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/tasks/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });

    /*
     * PUT /tasks/:id
     * Should not redirect when Task is invalid
     */
    it('should fail / not redirect on PUT /tasks/:id with an invalid Task', function (done) {
        var Task = app.models.Task
        , task = new TaskStub;

        Task.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/tasks/1')
        .send({ "Task": task })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * DELETE /tasks/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Task on DELETE /tasks/:id');

    /*
     * DELETE /tasks/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Task on DELETE /tasks/:id if it fails');
});
