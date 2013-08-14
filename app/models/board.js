module.exports = function (compound, Board) {
  // define Board here

	//- Prototype -//

	//- Methods -//
	Board.beforeCreate = function(next, data) {
		// set created date
		data.createdAt = new Date();

		next();
	};

  //- Validations -//


};