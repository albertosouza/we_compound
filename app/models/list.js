module.exports = function (compound, List) {
  // define List here
  //- RELATIOS -//
  List.belongsTo(compound.models.Board, {as: 'board'});
  List.hasMany(compound.models.Task,   {as: 'tasks'});
  //- Prototypes -//

  //- Methods -//
	List.beforeCreate = function(next, data) {
    // set created date
    data.createdAt = new Date();

    next();
	};
};