const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  game: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  prize: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Tournament", TournamentSchema);
const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({

name: String,

game: String,

date: Date,

prize: String,

registeredPlayers: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "User"
}
]

});

module.exports = mongoose.model("Tournament", TournamentSchema);
