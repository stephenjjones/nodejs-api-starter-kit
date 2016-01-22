
module.exports = function check_scopes(scopes) {
  return function(req, res, next) {
    // check if any of the scopes defined in the token,
    // is one of the scopes declared on check_scopes
    var token = req.decoded;
    console.log('token: ' + token.scopes);
    // TODO: modify these nested loops to functional
    for (var i =0; i < token.scopes.length; i++){
      for (var j=0; j<scopes.length; j++){
        if(scopes[j] === token.scopes[i]) return next();
      }
    }

    return res.send(401, 'insufficient permissions');
  }
}
