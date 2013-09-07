
/*
 * GET games listing.
 */

exports.list = function(req, res){
  res.render('index');
};

exports.create = function(req, res) {
  // create a game
  console.log("creating a game");
  res.render('index');
}
