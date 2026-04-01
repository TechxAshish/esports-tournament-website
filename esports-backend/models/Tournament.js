const TournamentSchema = new mongoose.Schema({
  title: String,
  game: String,
  date: String,
  prize: String,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Tournament', TournamentSchema);