const express = require("express");

const Tournament = require("../models/tournament");

const auth = require("../middleware/auth");

const router = express.Router();


// Create Tournament

router.post("/create", auth, async(req,res)=>{

try{

const tournament = new Tournament(req.body);

await tournament.save();

res.json(tournament);

}catch(err){

res.status(500).json(err);

}

});


// Get All Tournaments

router.get("/", async(req,res)=>{

const tournaments = await Tournament.find();

res.json(tournaments);

});

module.exports = router;
