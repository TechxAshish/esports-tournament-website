// Registration System
const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", async function(e){

e.preventDefault();

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const gamename = document.getElementById("gamename").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("http://localhost:5000/api/auth/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
username,
email,
gamename,
password
})

});

const data = await response.json();

alert(data.message);

window.location.href="login.html";

}

catch(error){

console.log(error);

alert("Registration failed");

}

});

}
/* Send Email */

emailjs.send("service_j073d88","template_naxj5lf",{
username: username,
email: email,
gamename: gamename
}).then(function(response){

alert("Registration Successful! Email Sent.");

window.location.href = "login.html";

}, function(error){

alert("Registration saved but email failed.");

});

});

}
//end of emailjs
// Login System
const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

const response = await fetch("http://localhost:5000/api/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email,
password
})

});

const data = await response.json();

localStorage.setItem("token",data.token);

alert("Login successful");

window.location.href="index.html";

});

}
// Display Player Profile

const playerName = document.getElementById("playerName");

if(playerName){

let player = JSON.parse(localStorage.getItem("player"));

if(player){

document.getElementById("playerName").innerText = player.username;

document.getElementById("playerEmail").innerText = "Email: " + player.email;

document.getElementById("playerGame").innerText = "Game Name: " + player.gamename;

}

}
// Team Creation System

const teamForm = document.getElementById("teamForm");

if(teamForm){

teamForm.addEventListener("submit", function(e){

e.preventDefault();

let teamName = document.getElementById("teamName").value;
let player1 = document.getElementById("player1").value;
let player2 = document.getElementById("player2").value;
let player3 = document.getElementById("player3").value;

let team = {
name: teamName,
members: [player1, player2, player3]
};

localStorage.setItem("team", JSON.stringify(team));

displayTeam();

});

}

function displayTeam(){

let team = JSON.parse(localStorage.getItem("team"));

if(team){

document.getElementById("displayTeam").innerHTML =
"Team Name: " + team.name + "<br>" +
"Members: " + team.members.join(", ");

}

}

displayTeam();
// Tournament Registration System//
document.querySelectorAll(".register-btn").forEach(btn => {

btn.addEventListener("click", function(){

const tournament = this.dataset.tournament;
const fee = this.dataset.fee;

alert("Registering for " + tournament + " | Fee ₹" + fee);

});

});
//Same but editable

let registerButtons = document.querySelectorAll(".register-btn");

registerButtons.forEach(function(button){

button.addEventListener("click", function(){

let tournamentName = this.getAttribute("data-tournament");

let player = JSON.parse(localStorage.getItem("player"));

if(!player){

alert("Please login first");

window.location.href = "login.html";

return;

}

let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

registrations.push({
player: player.username,
tournament: tournamentName
});

localStorage.setItem("registrations", JSON.stringify(registrations));

alert("Successfully Registered for " + tournamentName);

});

});
// Tournament Payment & Registration

let registerButtons = document.querySelectorAll(".register-btn");

registerButtons.forEach(function(button){

button.addEventListener("click", function(){

let tournamentName = this.getAttribute("data-tournament");
let fee = this.getAttribute("data-fee");

let player = JSON.parse(localStorage.getItem("player"));

if(!player){

alert("Please login first");
window.location.href = "login.html";
return;

}

let confirmPayment = confirm(
"Registration Fee for " + tournamentName + " is ₹" + fee + ". Proceed to payment?"
);

if(confirmPayment){

let registrations = JSON.parse(localStorage.getItem("registrations")) || [];

registrations.push({
player: player.username,
tournament: tournamentName,
fee: fee
});

localStorage.setItem("registrations", JSON.stringify(registrations));

alert("Payment Successful! You are registered for " + tournamentName);

}

});

});
/* After saving player in LocalStorage */

localStorage.setItem("player", JSON.stringify(player));

/* Send Email (Optional) */
emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
    username: username,
    email: email,
    gamename: gamename
}).then(function(response){
    // Redirect to thank you page
    window.location.href = "thankyou.html";
}, function(error){
    // Even if email fails, still redirect
    window.location.href = "thankyou.html";
});
function registerTournament(tournamentId){

const token = localStorage.getItem("token");

fetch("http://localhost:5000/api/tournament/register/" + tournamentId,{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization": token
}

})
.then(res=>res.json())
.then(data=>{

alert(data.message);

});

}
function registerTournament(tournamentId){

const token = localStorage.getItem("token");

fetch("http://localhost:5000/api/tournament/register/" + tournamentId, {

method: "POST",

headers:{
"Content-Type":"application/json",
"Authorization": token
}

})
.then(res => res.json())
.then(data => {

alert(data.message);

})
.catch(error => {

console.error("Error:", error);

});

}

const registerButtons = document.querySelectorAll(".register-btn");
registerButtons.forEach(button => {

button.addEventListener("click", function(){

const tournamentName = this.dataset.tournament;
const fee = this.dataset.fee;

const token = localStorage.getItem("token");

fetch("https://YOUR_BACKEND_URL/api/tournament/register", {

method: "POST",

headers: {
"Content-Type": "application/json",
"Authorization": token
},

body: JSON.stringify({
tournament: tournamentName,
fee: fee
})

})

.then(res => res.json())

.then(data => {

alert("Tournament registration successful!");

})

.catch(err => {

console.log(err);

});

});

});
// Button
const buttons = document.querySelectorAll(".register-btn");

buttons.forEach(button => {

button.addEventListener("click", function(){

const tournament = this.dataset.tournament;
const fee = this.dataset.fee;

alert("Registering for " + tournament + " | Entry Fee ₹" + fee);

});

});
document.querySelectorAll(".register-btn").forEach(button => {

button.addEventListener("click", function(){

const tournament = this.dataset.tournament;
const fee = this.dataset.fee;

alert("Registering for " + tournament + " | Entry Fee ₹" + fee);

});

});

function registerTournament(id){

localStorage.setItem("selectedTournament", id);

window.location.href = "tournament-register.html";

}
const form = document.getElementById("tournamentForm");

if(form){

form.addEventListener("submit", function(e){

e.preventDefault();

const teamName = document.getElementById("teamName").value;
const playerName = document.getElementById("playerName").value;
const email = document.getElementById("email").value;

localStorage.setItem("teamName", teamName);
localStorage.setItem("playerName", playerName);
localStorage.setItem("email", email);

window.location.href = "payment.html";

});

}

function completePayment(){

const teamName = localStorage.getItem("teamName");
const playerName = localStorage.getItem("playerName");
const email = localStorage.getItem("email");
const tournamentId = localStorage.getItem("selectedTournament");

fetch("http://localhost:5000/api/tournament/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

teamName,
playerName,
email,
tournamentId

})

})
.then(res => res.json())
.then(data => {

alert("Tournament Registration Successful!");

window.location.href="thankyou.html";

});

}
function registerTournament(tournamentId){

localStorage.setItem("selectedTournament", tournamentId);

window.location.href = "payment.html";

}
const paymentForm = document.getElementById("paymentForm");

if(paymentForm){

paymentForm.addEventListener("submit", function(e){

e.preventDefault();

const playerName = document.getElementById("playerName").value;
const email = document.getElementById("email").value;
const bankName = document.getElementById("bankName").value;
const accountNumber = document.getElementById("accountNumber").value;
const ifsc = document.getElementById("ifsc").value;

const tournamentId = localStorage.getItem("selectedTournament");

fetch("http://localhost:5000/api/tournament/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

playerName,
email,
bankName,
accountNumber,
ifsc,
tournamentId

})

})

.then(res => res.json())

.then(data => {

alert("Payment Successful and Tournament Registered!");

window.location.href = "thankyou.html";

});

});

}
