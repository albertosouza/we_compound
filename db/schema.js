module.exports = function (mongoose, compound) {
    // mongoose stuff
    var ObjectId = mongoose.Schema.Types.ObjectId;

    var Board = mongoose.model('Board', mongoose.Schema({
        title: String,
        description: String,
        createdAt: Date,
        active: {
            type: Boolean,
            default: true
        }
    }));

    // expose model name for view helpers (resource-based helpers like formFor)
    Board.modelName = 'Board';
    // register model in compound.models registry
    compound.models.Board = Board;

    var List = mongoose.model('List', mongoose.Schema({
        title: String,
        description: String,
        createdAt: Date,
        active: {
            type: Boolean,
            default: true
        }
    }));

    List.modelName = 'List';
    compound.models.List = List;




    var Task = mongoose.model('Task', mongoose.Schema({
        title: String,
        description: String,
        createdAt: Date,
        deadline: Date,
        active: {
            type: Boolean,
            default: true
        }
    }));

    Task.modelName = 'Task';
    compound.models.Task = Task;


   var User = mongoose.model('User', mongoose.Schema({
        username: {
            type: String,
            unique: true
        },
        displayName: String,
        email: {
            type: String,
            required: true,
            unique: true
        },
        cryptedPassword: {
            type: String
        },
        bio: String,
        createdAt: Date,
        activated: {
            type: Boolean,
            default: true
        },
        googleId: {
            type: String,
            unique: true
        },
        githubId: {
            type: String,
            unique: true
        },
        linkedinId: {
            type: String,
            unique: true
        },

        images : [{ type: ObjectId, ref: 'Image' }]
    }));

    User.modelName = 'User';
    compound.models.User = User;


    var Post = mongoose.model('Post', mongoose.Schema({
        content: String,
        createdAt: Date,
        updatedAt: Date
    }));

    Post.modelName = 'Post';
    compound.models.Post = Post;

    var Image = mongoose.model('Image', mongoose.Schema({
        name: String,
        description: String,
        fileName: String,
        type: String,
        length: Number,
        width: Number,
        height: Number,
        systemName: String,
        uploadDate: Date,
        author: { type: ObjectId, ref: 'User' }
     }));

    Image.modelName = 'Image';
    compound.models.Image = Image;


/*
    var Board = describe('Board', function () {
        property('title', String);
        property('description', Text);
        property('createdAt', Date);
        property('active', Boolean, {default: true});
        set('restPath', pathTo.boards);
    });

    var List = describe('List', function () {
        property('title', String);
        property('description', Text);
        property('createdAt', Date);
        property('active', Boolean, {default: true});
        set('restPath', pathTo.lists);
    });

    var Task = describe('Task', function () {
        property('title', String);
        property('description', Text);
        property('createdAt', Date);
        property('deadline', Date);
        property('active', Boolean, {default: true});
        set('restPath', pathTo.tasks);
    });

    var User = describe('User', function () {
        property('username', String);
        property('displayName', String);
        property('email', String, {required: true}, {index: true });
        property('password', String);
        property('bio', String);
        property('googleId', String, {index: true} );
        property('githubId', String, {index: true} );
        property('linkedinId', String, {index: true} );
        property('createdAt', Date);
        property('activated', Boolean, {default: true} );
        set('restPath', pathTo.users);
    });

    var Gallery = describe('Gallery', function () {
        property('name', String);
        property('description', Text);
        property('createdAt', Date);
        set('restPath', pathTo.galleries);
    });

    var Image = describe('Image', function () {
        property('name', String);
        property('description', String);
        property('fileName', String);
        property('type', String);
        property('length', Number);
        property('width', Number);
        property('height', Number);
        property('systemName', String);
        property('uploadDate', Date);
        set('restPath', pathTo.images);
    });

    var Post = describe('Post', function () {
        property('content', String);
        property('createdAt', Date);
        property('updatedAt', Date);
        set('restPath', pathTo.posts);
    });
*/
};
