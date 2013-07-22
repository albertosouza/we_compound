module.exports = function (compound, List) {
  // define List here
	
	List.beforeCreate = function(next, data) {
	    // set created date
	    data.createdAt = new Date();
	    
	    next();
	};
};