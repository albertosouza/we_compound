module.exports = function (compound, Board) {
  // define Board here

  //- RELATIONS -//
	Board.hasMany(compound.models.List,   {as: 'lists'});

	//- Prototype -//

	//- Methods -//
	Board.beforeCreate = function(next, data) {
		// set created date
		data.createdAt = new Date();

		next();
	};

  //- Validations -//
	Board.validatesPresenceOf('title', {
		message: 'Can not be blank'
	});

};