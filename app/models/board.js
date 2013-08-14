module.exports = function (compound, Board) {
  // define Board here

	//- Prototype -//

	//- Methods -//
  Board.schema.pre('save', function (next) {
      if (!this.createdAt){
        this.createdAt = new Date();
      } else {
        this.updatedAt = new Date();
      }

      var user = this;

      next();
  });

  //- Validations -//


};