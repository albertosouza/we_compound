load('application');

before(loadTask, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New task';
    this.task = new Task;
    render();
});

action(function create() {
    Task.create(req.body.Task, function (err, task) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: task && task.errors || err});
                } else {
                    send({code: 200, data: task.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Task can not be created');
                    render('new', {
                        task: task,
                        title: 'New task'
                    });
                } else {
                    flash('info', 'Task created');
                    redirect(path_to.tasks);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Tasks index';
    Task.all(function (err, tasks) {
        switch (params.format) {
            case "json":
                send({code: 200, data: tasks});
                break;
            default:
                render({
                    tasks: tasks
                });
        }
    });
});

action(function show() {
    this.title = 'Task show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.task});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Task edit';
    switch(params.format) {
        case "json":
            send(this.task);
            break;
        default:
            render();
    }
});

action(function update() {
    var task = this.task;
    this.title = 'Edit task details';
    this.task.updateAttributes(body.Task, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: task && task.errors || err});
                } else {
                    send({code: 200, data: task});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Task updated');
                    redirect(path_to.task(task));
                } else {
                    flash('error', 'Task can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.task.destroy(function (error) {
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
                    flash('error', 'Can not destroy task');
                } else {
                    flash('info', 'Task successfully removed');
                }
                send("'" + path_to.tasks + "'");
            });
        });
    });
});

function loadTask() {
    Task.findOne({ '_id': params.id }, function (err, task) {
        if (err || !task) {
            if (!err && !task && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.tasks);
        } else {
            this.task = task;
            next();
        }
    }.bind(this));
}
