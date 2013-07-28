load('application');

before(loadImage, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New image';
    this.image = new Image;
    render();
});

action(function create() {
    Image.create(req.body.Image, function (err, image) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: image && image.errors || err});
                } else {
                    send({code: 200, data: image.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Image can not be created');
                    render('new', {
                        image: image,
                        title: 'New image'
                    });
                } else {
                    flash('info', 'Image created');
                    redirect(path_to.images);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Images index';
    Image.all(function (err, images) {
        switch (params.format) {
            case "json":
                send({code: 200, data: images});
                break;
            default:
                render({
                    images: images
                });
        }
    });
});

action(function show() {
    this.title = 'Image show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.image});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Image edit';
    switch(params.format) {
        case "json":
            send(this.image);
            break;
        default:
            render();
    }
});

action(function update() {
    var image = this.image;
    this.title = 'Edit image details';
    this.image.updateAttributes(body.Image, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: image && image.errors || err});
                } else {
                    send({code: 200, data: image});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Image updated');
                    redirect(path_to.image(image));
                } else {
                    flash('error', 'Image can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.image.destroy(function (error) {
        respondTo(function (format) {
            format.json(function () {
                if (error) {
                    send({code: 500, error: error});
                } else {
                    send({code: 200});
                }
            });
            format.html(function () {
                if (error) {
                    flash('error', 'Can not destroy image');
                } else {
                    flash('info', 'Image successfully removed');
                }
                send("'" + path_to.images + "'");
            });
        });
    });
});

function loadImage() {
    Image.find(params.id, function (err, image) {
        if (err || !image) {
            if (!err && !image && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.images);
        } else {
            this.image = image;
            next();
        }
    }.bind(this));
}
