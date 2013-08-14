module.exports = function (compound, Post) {
  // define Post here

  //- RELATIONS -//

  //- Prototype -//

  // fetch assoc
  Post.prototype.fetchAssoc = function (cb){


  };

  //- Methods -//

  Post.schema.pre('save', function (next) {
    if (this.isNew){
      this.createdAt = new Date();
    } else {
      this.updatedAt = new Date();
    }
    next();
  });

  Post.beforeCreate = function(next, data) {
      data.createdAt = new Date();
      next();
  };
};