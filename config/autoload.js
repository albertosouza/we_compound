module.exports = function (compound) {
  var defaultModules = [
      'jugglingdb',
      'co-assets-compiler',
      'compound-passport'
    ], developmentModules = [];

  if ('development' === compound.app.get('env')) {
    developmentModules = [
      'ejs-ext',
      'seedjs',
      'co-generators'
    ]
  }

  if (typeof window === 'undefined') {
    return defaultModules.concat(developmentModules).map(require);
  } else {
    return []
  }
};

