load('application');

before(loadBoard, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New board';
    this.board = new Board;
    render();
});

action(function create() {
    Board.create(req.body.Board, function (err, board) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: board && board.errors || err});
                } else {
                    send({code: 200, data: board.toObject()});
                }
            });
            format.html(function () {
                if (err) {
                    flash('error', 'Board can not be created');
                    render('new', {
                        board: board,
                        title: 'New board'
                    });
                } else {
                    flash('info', 'Board created');
                    redirect(path_to.boards);
                }
            });
        });
    });
});

action(function index() {
    this.title = 'Boards index';
    Board.all(function (err, boards) {
        switch (params.format) {
            case "json":
                send({code: 200, data: boards});
                break;
            default:
                render({
                    boards: boards
                });
        }
    });
});

action(function show() {
    this.title = 'Board show';
    switch(params.format) {
        case "json":
            send({code: 200, data: this.board});
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Board edit';
    switch(params.format) {
        case "json":
            send(this.board);
            break;
        default:
            render();
    }
});

action(function update() {
    var board = this.board;
    this.title = 'Edit board details';
    this.board.updateAttributes(body.Board, function (err) {
        respondTo(function (format) {
            format.json(function () {
                if (err) {
                    send({code: 500, error: board && board.errors || err});
                } else {
                    send({code: 200, data: board});
                }
            });
            format.html(function () {
                if (!err) {
                    flash('info', 'Board updated');
                    redirect(path_to.board(board));
                } else {
                    flash('error', 'Board can not be updated');
                    render('edit');
                }
            });
        });
    });
});

action(function destroy() {
    this.board.destroy(function (error) {
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
                    flash('error', 'Can not destroy board');
                } else {
                    flash('info', 'Board successfully removed');
                }
                send("'" + path_to.boards + "'");
            });
        });
    });
});

function loadBoard() {
    Board.find(params.id, function (err, board) {
        if (err || !board) {
            if (!err && !board && params.format === 'json') {
                return send({code: 404, error: 'Not found'});
            }
            redirect(path_to.boards);
        } else {
            this.board = board;
            next();
        }
    }.bind(this));
}
