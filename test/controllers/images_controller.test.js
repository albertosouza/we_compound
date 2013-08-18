var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function ImageStub () {
    return {
        name: '',
        description: '',
        fileName: '',
        type: '',
        length: '',
        systemName: '',
        mime: '',
        uploadDate: ''
    };
}

describe('ImageController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /images/new
     * Should render images/new.ejs
     */
    it('should render "new" template on GET /images/new', function (done) {
        request(app)
        .get('/images/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/images\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /images
     * Should render images/index.ejs
     */
    it('should render "index" template on GET /images', function (done) {
        request(app)
        .get('/img')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/images\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /images/:id/edit
     * Should access Image#find and render images/edit.ejs
     */
    it('should access Image#find and render "edit" template on GET /images/:id/edit', function (done) {
        var Image = app.compound.models.Image;

        // Mock Image#find
        Image.findOne = sinon.spy(function (id, callback) {
            callback(null, new Image);
        });

        request(app)
        .get('/img/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Image.findOne.calledWith({ '_id': '42'}).should.be.true;
            app.didRender(/images\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /images/:id
     * Should render images/index.ejs
     */
    it('should access Image#find and render "show" template on GET /images/:id', function (done) {
        var Image = app.compound.models.Image;

        // Mock Image#find
        Image.findOne = sinon.spy(function (id, callback) {
            callback(null, new Image);
        });

        request(app)
        .get('/img/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Image.findOne.calledWith({ '_id': '42'}).should.be.true;
            app.didRender(/images\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * DELETE /images/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Image on DELETE /images/:id');

    /*
     * DELETE /images/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Image on DELETE /images/:id if it fails');
});
