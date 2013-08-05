before('protect from forgery', function () {
  protectFromForgery('27d24dd78c2f8c8c2d762e2908409f227a655032');
});


before(function requireManager() {

    if (!session.passport.user) {
        console.log('deslogado');
        req.session.redirect = req.path;
        next();
        //redirect('/auth/google');
    } else {
        User.find(session.passport.user, function (err, user) {
            if (user && user.email === 'alberto.souza.99@gmail.com') {
                req.user = user;
                next();
            } else {
                flash('error', 'You have no permission to access this area');
                console.log('sem permissão');
                //redirect('/');
                next();
            }
        });
    }
});

// Publish methods for use in other controllers.
publish('getAssociated', getAssociated);



/**
 * Joins associated models and allows them to be accessed like:
 * - user.role.name
 * - post.user.displayName
 *
 * @param {Array} models Collection of models.
 * @param {String} assoc Model that will be associated with `model` param
 * @param {Boolean} multi Indication that `models` contains more than one
 *     kind of model.
 * @param {String} modelName Name of model to use if `multi` boolean is true.
 * @param {Function} cb Function to call when all associations have been made.
 */
function getAssociated(models, assoc, multi, modelName, cb) {
  var results = [];

  function makeAssoc(model, assoc, callback) {
    model = (multi) ? model[modelName] : model;
    model[assoc](function (err, assoc) {
      callback(assoc);
    });
  }

  function findAssoc(model) {
    if (model) {
      makeAssoc(model, assoc, function (result) {
        var obj = {};
        if (!multi) {
          obj[modelName] = model;
        } else {
          obj = model;
        }
        obj[String(assoc)] = result;
        results.push(obj);
        return findAssoc(models.shift());
      });
    } else {
      return cb(results);
    }
  }

  findAssoc(models.shift());
}