module.exports = function (compound, List) {
  // define List here
  //- RELATIOS -//

  //- Prototypes -//

  //- Methods -//
  List.schema.pre('save', function (next) {
    if (this.isNew){
      this.createdAt = new Date();
    } else {
      this.updatedAt = new Date();
    }
    next();
  });

};