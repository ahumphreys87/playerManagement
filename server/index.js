var Hapi        = require('hapi');
var routes      = require('./routes');
var Mongoose    = require('mongoose');

var server = new Hapi.Server();
server.connection({ port: 3000, routes: { cors: true } });

// MongoDB Connection
Mongoose.connect('mongodb://localhost/playerManagement');

var rootHandler = function(request, reply) {
    reply({ message: "Player Management API!"});
};

// Set root route
server.route({
    method: 'GET',
    path: '/',
    handler: rootHandler
});

routes.init(server);

server.start(function () {
    console.log('Server started at: ' + server.info.uri);
});