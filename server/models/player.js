var Mongoose   = require('mongoose');
var Schema     = Mongoose.Schema;

// The data schema for an event that we're tracking in our analytics engine
var playerSchema = new Schema({
  firstName      : { type: String, required: true, trim: true },
  surname        : { type: String, required: true, trim: true },
  address         : { type: String, trim: true }
});

var player = Mongoose.model('player', playerSchema);

module.exports = {
  Player: player
};