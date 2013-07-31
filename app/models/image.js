var fs = require('fs');
var mv = require('mv');

module.exports = function (compound, Image) {
  // define Image here
    console.log(compound.root);
    // The directory to upload Images too.
    Image.directory = compound.root + '/public/media/galleries/images';

    Image.src = compound.root + '/public/media/galleries/images';

    Image.beforeCreate = function(next, data) {

        // set created date
        data.uploadDate = new Date();
        next();
    };


    Image.prototype.remove = function (cb) {
        fs.unlink(Image.createFilename(this.name), cb);
    };

    Image.prototype.src = function () {
        return '/media/galleries/images/' + this.systemName;
    };

    Image.createFilename = function (name) {
        return Image.directory + '/' +  name;
    };

    Image.prototype.upload = function (name, path, cb) {
        mv(path, Image.createFilename(name), cb);
    };

    Image.prototype.rename = function (name, cb) {
        var oldPath = Image.createFilename(this.name);
        this.name = name;
        fs.rename(oldPath, Image.createFilename(this.name), cb);
    };


};