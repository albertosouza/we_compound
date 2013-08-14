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
        },
        author: { type: ObjectId, ref: 'User' }
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
        },
        author: { type: ObjectId, ref: 'User' }
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
        },
        author: { type: ObjectId, ref: 'User' }
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
        updatedAt: Date,
        author: { type: ObjectId, ref: 'User' }
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


    var Gallery = mongoose.model('Gallery', mongoose.Schema({
        name: String,
        description: String,
        createdAt: Date,
        author: { type: ObjectId, ref: 'User' }
     }));

    Gallery.modelName = 'Gallery';
    compound.models.Gallery = Gallery;

};
