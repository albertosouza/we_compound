load('application');

before(loadList, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New list';
    this.list = new List();
    render();
});

action(function create() {
    var list = new List();

    if(req.body.List){
        list.title = req.body.List.title;
        list.description = req.body.List.description;
    }

    // set author if user is authenticated
    if(req)
        if(req.isAuthenticated())
            list.author = req.user._id;

    list.save( function (err, list) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: list && list.errors || err});
                } else {
                    send({code: 200, data: list.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'List can not be created');
                    render('new', {
                        list: list,
                        title: 'New list'
                    });
                } else {
                    flash('info', 'List created');
                    redirect(path_to.lists);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Lists index';

    List
        .find()
        .limit(10)
       // .sort('+createdAt')
        .exec( function (err, lists) {
            switch (params.format) {
                case "json":
                    send({code: 200, data: lists});
                    break;
                default:
                    render({
                        lists: lists
                    });
            }
    });
});

action(function show() {
    this.title = 'List show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.list});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'List edit';
    switch(params.format) {
        case "json":
            send(this.list);
            break;
        default:
            render();
    }
});

action(function update() {
    var list = this.list;
    this.title = 'Edit list details';

    if(req.body.List){
        list.title = req.body.List.title;
        list.description = req.body.List.description;
    }

    list.save( function (err, list) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: list && list.errors || err});
                } else {
                    send({code: 200, data: list});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'List updated');
                    redirect(path_to.list(list));
                } else {
                    flash('error', 'List can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.list.remove(function (error) {
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
                    flash('error', 'Can not destroy list');
                } else {
                    flash('info', 'List successfully removed');
                }
                send("'" + path_to.lists + "'");
            });
        });
    });
});

function loadList() {
    List.findOne({ '_id': params.id }, function (err, list) {
        if (err || !list) {
            if (!err && !list && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.lists);
        } else {
            this.list = list;
            next();
        }
    }.bind(this));
}
