var fs = require('fs');
var mv = require('mv');
var imageFolder = 'public/media/galleries/images/';


module.exports = function (compound, Image) {
    // define Image here

    //- RELATIOS -//

    //- Prototype -//
    Image.prototype.deleteFile = function (cb) {
        fs.unlink(Image.createFilename(this.name), cb);
    };

    Image.prototype.src = function () {
        return '/media/galleries/images/' + this.systemName;
    };

    Image.prototype.upload = function (tmpFile , cb) {

        // set image vars
        this.systemName = Image.createFilename(tmpFile.name);
        this.fileName = tmpFile.name;
        this.type = tmpFile.type;
        this.size = tmpFile.type;

        //set field name as tmp file name if user dont specify
        if(!this.name){
            this.name = tmpFile.name;
        }

        mv(tmpFile.path, imageFolder + this.systemName, cb);
    };

    Image.prototype.rename = function (name, cb) {
        var oldPath = Image.createFilename(this.name);
        this.name = name;
        fs.rename(oldPath, Image.createFilename(this.name), cb);
    };

    //- Methods -//
    Image.createFilename = function (name){
        return name;

    };

};