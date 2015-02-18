var Boom    = require('boom');                                  // HTTP Errors
var Joi     = require('joi');                                   // Validation
var Player   = require('../models/player').Player; // Mongoose ODM

// Exports = exports? Huh? Read: http://stackoverflow.com/a/7142924/5210
module.exports = exports = function (server) {

    console.log('Loading events routes');
    exports.index(server);
    exports.create(server);
    exports.show(server);
    exports.update(server);
    exports.remove(server);
};

/**
 * GET /players
 * Gets all the players from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.index = function (server) {
    // GET /players
    server.route({
        method: 'GET',
        path: '/players',
        handler: function (request, reply) {
            Player.find({}, function (err, players) {
                if (!err) {
                    reply(players);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
        }
    });
};

/**
 * POST /new
 * Creates a new player in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function (server) {
    // POST /players
    var player;

    server.route({
        method: ['PUT', 'POST'],
        path: '/players',
        handler: function (request, reply) {

            player = new Player();
            player.firstName = request.payload.firstName;
            player.surname = request.payload.surname;
            player.address = request.payload.address;

            player.save(function (err) {
                if (!err) {
                    reply(player).created('/players/' + player._id);    // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
    });
};

/**
 * GET /players/{id}
 * Gets the player based upon the {id} parameter.
 *
 * @param server
 */
exports.show = function (server) {

    server.route({
        method: 'GET',
        path: '/players/{id}',
        config: {
            validate: {
                params: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Player.findById(request.params.id, function (err, player) {
                if (!err && player) {
                    reply(player);
                } else if (err) {
                    // Log it, but don't show the user, don't want to expose ourselves (think security)
                    console.log(err);
                    reply(Boom.notFound());
                } else {

                    reply(Boom.notFound());
                }
            });
        }
    })
};

/**
 * GET /players/{id}
 * Gets the player based upon the {id} parameter.
 *
 * @param server
 */
exports.update = function (server) {

    server.route({
        method: ['PUT', 'POST'],
        path: '/players/{id}',
        config: {
            validate: {
                params: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Player.findById(request.params.id, function (err, player) {
                player.firstName = request.payload.firstName;
                player.surname = request.payload.surname;
                player.address = request.payload.address;

                player.save(function (err) {
                    if (!err) {
                        reply(player).created('/players/' + player._id);    // HTTP 201
                    } else {
                        reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                    }
                });
            });
        }
    })
};

/**
 * DELETE /players/{id}
 * Deletes a player, based on the player id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function (server) {
    server.route({
        method: 'DELETE',
        path: '/players/{id}',
        config: {
            validate: {
                params: {
                    id: Joi.string().alphanum().min(5).required()
                }
            }
        },
        handler: function (request, reply) {
            Player.findById(request.params.id, function(err, player) {
                if(!err && player) {
                    player.remove();
                    reply({ message: "Player deleted successfully"});
                } else if(!err) {
                    // Couldn't find the object.
                    reply(Boom.notFound());
                } else {
                    console.log(err);
                    reply(Boom.badRequest("Could not delete Player"));
                }
            });
        }
    })
};

/**
 * Formats an error message that is returned from Mongoose.
 *
 * @param err The error object
 * @returns {string} The error message string.
 */
function getErrorMessageFrom(err) {
    var errorMessage = '';

    if (err.errors) {
        for (var prop in err.errors) {
            if(err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }

    } else {
        errorMessage = err.message;
    }

    return errorMessage;
}