module.exports = function (compound, Gallery) {
  // define Gallery here

  //- RELATIONS -//
  Gallery.hasMany(compound.models.Image,   {as: 'images'});

  //- Methods -//
  Gallery.beforeCreate = function(next, data) {
      // set created date
      data.createdAt = new Date();
      next();
  };
};