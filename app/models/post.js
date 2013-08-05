module.exports = function (compound, Post) {
  // define Post here

  //- RELATIONS -//
  Post.belongsTo(compound.models.User,   {as: 'author'});
  Post.hasMany(compound.models.Image,   {as: 'images'});

  //- Prototype -//

  // fetch assoc
  Post.prototype.fetchAssoc = function (cb){


  }

  //- Methods -//

  Post.beforeCreate = function(next, data) {
      data.createdAt = new Date();
      next();
  };

  Post.beforeUpdate = function(next, data) {
      data.updatedAt = new Date();
      next();
  };


};