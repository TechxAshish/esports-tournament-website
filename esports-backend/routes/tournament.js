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

// Registration code
router.post("/register/:tournamentId", auth, async(req,res)=>{

try{

const tournament = await Tournament.findById(req.params.tournamentId);

if(!tournament){
return res.status(404).json({message:"Tournament not found"});
}

if(tournament.registeredPlayers.includes(req.user.id)){
return res.json({message:"Already registered"});
}

tournament.registeredPlayers.push(req.user.id);

await tournament.save();

res.json({message:"Tournament Registration Successful"});

}catch(error){

res.status(500).json(error);

}

});
router.post("/register", async(req,res)=>{

try{

const {teamName, playerName, email, tournamentId} = req.body;

const tournament = await Tournament.findById(tournamentId);

tournament.registeredPlayers.push({

teamName,
playerName,
email

});

await tournament.save();

res.json({message:"Registration Successful"});

}catch(error){

res.status(500).json(error);

}

});
router.post("/register", async(req,res)=>{

try{

const {playerName,email,bankName,accountNumber,ifsc,tournamentId} = req.body;

const tournament = await Tournament.findById(tournamentId);

if(!tournament){

return res.status(404).json({message:"Tournament not found"});

}

tournament.registeredPlayers.push({

playerName,
email,

payment:{
bankName,
accountNumber,
ifsc
}

});

await tournament.save();

res.json({message:"Registration Successful"});

}

catch(error){

res.status(500).json(error);

}

});
