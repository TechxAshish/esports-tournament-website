const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');
const auth = require('../middleware/auth');

// CREATE TOURNAMENT
router.post('/', auth, async (req, res) => {
  try {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.json(tournament);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// GET ALL TOURNAMENTS
router.get('/', async (req, res) => {
  const tournaments = await Tournament.find();
  res.json(tournaments);
});

// JOIN TOURNAMENT
router.post('/join/:id', auth, async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    tournament.participants.push(req.user.id);
    await tournament.save();
    res.json(tournament);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;