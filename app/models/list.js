module.exports = function (compound, List) {
  // define List here
  //- RELATIOS -//

  //- Prototypes -//

  //- Methods -//
	List.beforeCreate = function(next, data) {
    // set created date
    data.createdAt = new Date();

    next();
	};
};