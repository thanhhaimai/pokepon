/*
 * GET soundcloud
 */

exports.index = function(req, res){
  res.render('soundcloud', { title: 'Soundcloud' });
};
