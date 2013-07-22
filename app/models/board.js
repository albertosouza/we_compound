module.exports = function (compound, Board) {
  // define Board here
	Board.beforeCreate = function(next, data) {
	    // set created date
	    data.createdAt = new Date();
	    
	    next();
	};
	
  // validations	
	Board.validatesPresenceOf('title', {
		message: 'Can not be blank'
	});
	
};