var app, compound
, request = require('supertest')
, sinon   = require('sinon');

function GalleryStub () {
    return {
        name: '',
        description: '',
        createdAt: ''
    };
}

describe('GalleryController', function() {
    beforeEach(function(done) {
        app = getApp();
        compound = app.compound;
        compound.on('ready', function() {
            done();
        });
    });

    /*
     * GET /galleries/new
     * Should render galleries/new.ejs
     */
    it('should render "new" template on GET /galleries/new', function (done) {
        request(app)
        .get('/galleries/new')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/galleries\/new\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /galleries
     * Should render galleries/index.ejs
     */
    it('should render "index" template on GET /galleries', function (done) {
        request(app)
        .get('/galleries')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didRender(/galleries\/index\.ejs$/i).should.be.true;
            done();
        });
    });

    /*
     * GET /galleries/:id/edit
     * Should access Gallery#find and render galleries/edit.ejs
     */
    it('should access Gallery#find and render "edit" template on GET /galleries/:id/edit', function (done) {
        var Gallery = app.compound.models.Gallery;

        // Mock Gallery#find
        Gallery.findOne = sinon.spy(function (id, callback) {
            callback(null, new Gallery);
        });

        request(app)
        .get('/galleries/1/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Gallery.findOne.calledWith({ '_id': '1'}).should.be.true;
            app.didRender(/galleries\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /galleries/:id
     * Should render galleries/index.ejs
     */
    it('should access Gallery#find and render "show" template on GET /galleries/:id', function (done) {
        var Gallery = app.compound.models.Gallery;

        // Mock Gallery#find
        Gallery.findOne = sinon.spy(function (id, callback) {
            callback(null, new Gallery);
        });

        request(app)
        .get('/galleries/1')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Gallery.findOne.calledWith({ '_id': '1'}).should.be.true;
            app.didRender(/galleries\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /galleries
     * Should access Gallery#create when Gallery is valid
     */
     /* TODO
    it('should access Gallery#create on POST /galleries with a valid Gallery', function (done) {
        var Gallery = app.models.Gallery
        , gallery = new GalleryStub;

        // Mock Gallery#create
        Gallery.create = sinon.spy(function (data, callback) {
            callback(null, gallery);
        });

        request(app)
        .post('/galleries')
        .send({ "Gallery": gallery })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Gallery.create.calledWith(gallery).should.be.true;

            done();
        });
    });
*/
    /*
     * POST /galleries
     * Should fail when Gallery is invalid
     */
     /*
    it('should fail on POST /galleries when Gallery#create returns an error', function (done) {
        var Gallery = app.models.Gallery
        , gallery = new GalleryStub;

        // Mock Gallery#create
        Gallery.create = sinon.spy(function (data, callback) {
            callback(new Error, gallery);
        });

        request(app)
        .post('/galleries')
        .send({ "Gallery": gallery })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Gallery.create.calledWith(gallery).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });
*/
    /*
     * PUT /galleries/:id
     * Should redirect back to /galleries when Gallery is valid
     */
     /* TODO
    it('should redirect on PUT /galleries/:id with a valid Gallery', function (done) {
        var Gallery = app.models.Gallery
        , gallery = new GalleryStub;

        Gallery.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/galleries/1')
        .send({ "Gallery": gallery })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/galleries/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });
*/
    /*
     * PUT /galleries/:id
     * Should not redirect when Gallery is invalid
     */
     /* TODO
    it('should fail / not redirect on PUT /galleries/:id with an invalid Gallery', function (done) {
        var Gallery = app.models.Gallery
        , gallery = new GalleryStub;

        Gallery.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/galleries/1')
        .send({ "Gallery": gallery })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

            done();
        });
    });
*/
    /*
     * DELETE /galleries/:id
     * -- TODO: IMPLEMENT --
     */
    it('should delete a Gallery on DELETE /galleries/:id');

    /*
     * DELETE /galleries/:id
     * -- TODO: IMPLEMENT FAILURE --
     */
    it('should not delete a Gallery on DELETE /galleries/:id if it fails');
});
