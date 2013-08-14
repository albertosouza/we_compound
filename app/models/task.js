module.exports = function (compound, Task) {
  // define Task here

  //- RELATIONS -//

  //- Methods -//
  Task.schema.pre('save', function (next) {
    if (this.isNew){
      this.createdAt = new Date();
    } else {
      this.updatedAt = new Date();
    }
    next();
  });

};