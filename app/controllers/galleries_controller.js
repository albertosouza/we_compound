load('application');

before(loadGallery, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New gallery';
    this.gallery = new Gallery();
    render();
});

action(function create() {
    var gallery = new Gallery();

    if(req.body.Gallery){
        gallery.name = req.body.Gallery.name;
        gallery.description = req.body.Gallery.description;
    }

    // set author if user is authenticated
    if(req)
        if(req.isAuthenticated())
            gallery.author = req.user._id;

    gallery.save( function (err, gallery) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: gallery && gallery.errors || err});
                } else {
                    send({code: 200, data: gallery.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Gallery can not be created');
                    render('new', {
                        gallery: gallery,
                        title: 'New gallery'
                    });
                } else {
                    flash('info', 'Gallery created');
                    redirect(path_to.galleries);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Gallerys index';

    Gallery
        .find()
        .limit(10)
        .sort('+createdAt')
        .exec( function (err, galleries) {
            switch (params.format) {
                case "json":
                    send({code: 200, data: galleries});
                    break;
                default:
                    render({
                        galleries: galleries
                    });
            }
    });
});

action(function show() {
    this.title = 'Gallery show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.gallery});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Gallery edit';
    switch(params.format) {
        case "json":
            send(this.gallery);
            break;
        default:
            render();
    }
});

action(function update() {
    var gallery = this.gallery;
    this.title = 'Edit gallery details';

    if(req.body.Gallery){
        gallery.name = req.body.Gallery.name;
        gallery.description = req.body.Gallery.description;
    }

    this.gallery.save( function (err, gallery) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: gallery && gallery.errors || err});
                } else {
                    send({code: 200, data: gallery});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Gallery updated');
                    redirect(path_to.gallery(gallery));
                } else {
                    flash('error', 'Gallery can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.gallery.remove(function (error) {
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
                    flash('error', 'Can not destroy gallery');
                } else {
                    flash('info', 'Gallery successfully removed');
                }
                send("'" + path_to.galleries + "'");
            });
        });
    });
});

function loadGallery() {
    Gallery.findOne({ '_id': params.id }, function (err, gallery) {
        if (err || !gallery) {
            if (!err && !gallery && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.galleries);
        } else {
            this.gallery = gallery;
            next();
        }
    }.bind(this));
}
