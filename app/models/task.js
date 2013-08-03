module.exports = function (compound, Task) {
  // define Task here

  //- RELATIONS -//
  Task.belongsTo(compound.models.List, {as: 'list'});

  //- Methods -//
  Task.beforeCreate = function(next, data) {
    // set created date
    data.createdAt = new Date();

    next();
  };
};