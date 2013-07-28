module.exports = function (compound, Image) {
  // define Image here
    Image.beforeCreate = function(next, data) {
        // set created date
        data.uploadDate = new Date();
        next();
    };
};