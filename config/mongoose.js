exports.init = function (compound) {
    var conf = require('./database.json')[compound.app.set('env')];
    var mongoose = require('mongoose');

    // TODO this if is for tests how try to reconnect then we need to pull to tests
    if( mongoose.connection.readyState === 1 ) {
      // are connected
      if (mongoose.models){
        compound.models = mongoose.models;
      }else{
        require(compound.root + '/db/schema')(mongoose, compound);
      }
    } else {
      // try to connect and set the models
      mongoose.connect(conf.url);
      require(compound.root + '/db/schema')(mongoose, compound);
    }


};