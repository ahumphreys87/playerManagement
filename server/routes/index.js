/**
 * Add your other routes below.
 * Each model might have a file that declares its
 * routes, such as the Players model.
 *
 * @param server
 */
exports.init = function(server) {
  console.log('Loading routes');

  require('./players')(server);
};