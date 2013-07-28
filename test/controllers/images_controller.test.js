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
        .get('/images')
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
        var Image = app.models.Image;

        // Mock Image#find
        Image.find = sinon.spy(function (id, callback) {
            callback(null, new Image);
        });

        request(app)
        .get('/images/42/edit')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Image.find.calledWith('42').should.be.true;
            app.didRender(/images\/edit\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * GET /images/:id
     * Should render images/index.ejs
     */
    it('should access Image#find and render "show" template on GET /images/:id', function (done) {
        var Image = app.models.Image;

        // Mock Image#find
        Image.find = sinon.spy(function (id, callback) {
            callback(null, new Image);
        });

        request(app)
        .get('/images/42')
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Image.find.calledWith('42').should.be.true;
            app.didRender(/images\/show\.ejs$/i).should.be.true;

            done();
        });
    });

    /*
     * POST /images
     * Should access Image#create when Image is valid
     */
    it('should access Image#create on POST /images with a valid Image', function (done) {
        var Image = app.models.Image
        , image = new ImageStub;

        // Mock Image#create
        Image.create = sinon.spy(function (data, callback) {
            callback(null, image);
        });

        request(app)
        .post('/images')
        .send({ "Image": image })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            Image.create.calledWith(image).should.be.true;

            done();
        });
    });

    /*
     * POST /images
     * Should fail when Image is invalid
     */
    it('should fail on POST /images when Image#create returns an error', function (done) {
        var Image = app.models.Image
        , image = new ImageStub;

        // Mock Image#create
        Image.create = sinon.spy(function (data, callback) {
            callback(new Error, image);
        });

        request(app)
        .post('/images')
        .send({ "Image": image })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            Image.create.calledWith(image).should.be.true;

            app.didFlash('error').should.be.true;

            done();
        });
    });

    /*
     * PUT /images/:id
     * Should redirect back to /images when Image is valid
     */
    it('should redirect on PUT /images/:id with a valid Image', function (done) {
        var Image = app.models.Image
        , image = new ImageStub;

        Image.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(null) }
            });
        });

        request(app)
        .put('/images/1')
        .send({ "Image": image })
        .end(function (err, res) {
            res.statusCode.should.equal(302);
            res.header['location'].should.include('/images/1');

            app.didFlash('error').should.be.false;

            done();
        });
    });

    /*
     * PUT /images/:id
     * Should not redirect when Image is invalid
     */
    it('should fail / not redirect on PUT /images/:id with an invalid Image', function (done) {
        var Image = app.models.Image
        , image = new ImageStub;

        Image.find = sinon.spy(function (id, callback) {
            callback(null, {
                id: 1,
                updateAttributes: function (data, cb) { cb(new Error) }
            });
        });

        request(app)
        .put('/images/1')
        .send({ "Image": image })
        .end(function (err, res) {
            res.statusCode.should.equal(200);
            app.didFlash('error').should.be.true;

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
