module.exports = function (compound, Gallery) {
  // define Gallery here

  //- RELATIONS -//

  //- Methods -//
  //- Methods -//
  Gallery.schema.pre('save', function (next) {
      if (!this.createdAt){
        this.createdAt = new Date();
      } else {
        this.updatedAt = new Date();
      }
      next();
  });
};