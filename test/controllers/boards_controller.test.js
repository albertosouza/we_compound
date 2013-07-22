var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function BoardStub () {
    return {
        title: '',
        description: '',
        createdAt: '',
        active: ''
    };
}

describe('BoardController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /boards/new
     * Should render boards/new.ejs
     */
    it('should render "new" template on GET /boards/new', function (done) {
        request(app)
        .get('/boards/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/boards\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /boards
     * Should render boards/index.ejs
     */
    it('should render "index" template on GET /boards', function (done) {
        request(app)
        .get('/boards')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/boards\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /boards/:id/edit
     * Should access Board#find and render boards/edit.ejs
     */
    it('should access Board#find and render "edit" template on GET /boards/:id/edit', function (done) {
        var Board = app.models.Board;

        // Mock Board#find
        Board.find = sinon.spy(function (id, callback) {
            callback(null, new Board);
        });

        request(app)
        .get('/boards/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Board.find.calledWith('42').should.be.true;
            app.didRender(/boards\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /boards/:id
     * Should render boards/index.ejs
     */
    it('should access Board#find and render "show" template on GET /boards/:id', function (done) {
        var Board = app.models.Board;

        // Mock Board#find
        Board.find = sinon.spy(function (id, callback) {
            callback(null, new Board);
        });

        request(app)
        .get('/boards/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Board.find.calledWith('42').should.be.true;
            app.didRender(/boards\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /boards
     * Should access Board#create when Board is valid
     */
    it('should access Board#create on POST /boards with a valid Board', function (done) {
        var Board = app.models.Board
        , board = new BoardStub;

        // Mock Board#create
        Board.create = sinon.spy(function (data, callback) {
            callback(null, board);
        });

        request(app)
        .post('/boards')
        .send({ "Board": board })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Board.create.calledWith(board).should.be.true;

            done();
        });
    });

    /*
     * POST /boards
     * Should fail when Board is invalid
     */
    it('should fail on POST /boards when Board#create returns an error', function (done) {
        var Board = app.models.Board
        , board = new BoardStub;

        // Mock Board#create
        Board.create = sinon.spy(function (data, callback) {
            callback(new Error, board);
        });

        request(app)
        .post('/boards')
        .send({ "Board": board })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Board.create.calledWith(board).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /boards/:id
     * Should redirect back to /boards when Board is valid
     */
    it('should redirect on PUT /boards/:id with a valid Board', function (done) {
        var Board = app.models.Board
        , board = new BoardStub;

        Board.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/boards/1')
        .send({ "Board": board })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/boards/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });

    /*
     * PUT /boards/:id
     * Should not redirect when Board is invalid
     */
    it('should fail / not redirect on PUT /boards/:id with an invalid Board', function (done) {
        var Board = app.models.Board
        , board = new BoardStub;

        Board.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/boards/1')
        .send({ "Board": board })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * DELETE /boards/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Board on DELETE /boards/:id');

    /*
     * DELETE /boards/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Board on DELETE /boards/:id if it fails');
});
