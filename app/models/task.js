module.exports = function (compound, Task) {
  // define Task here

  //- RELATIONS -//

  //- Methods -//
  Task.beforeCreate = function(next, data) {
    // set created date
    data.createdAt = new Date();

    next();
  };
};