module.exports = function (compound, Gallery) {
  // define Gallery here
    Gallery.beforeCreate = function(next, data) {
        // set created date
        data.createdAt = new Date();
        next();
    };
};