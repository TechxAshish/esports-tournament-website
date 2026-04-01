// Registration System
const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", function(e){

e.preventDefault();

let username = document.getElementById("username").value;
let email = document.getElementById("email").value;
let password = document.getElementById("password").value;
let gamename = document.getElementById("gamename").value;

let player = {
username: username,
email: email,
password: password,
gamename: gamename
};

localStorage.setItem("player", JSON.stringify(player));

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

loginForm.addEventListener("submit", function(e){

e.preventDefault();

let email = document.getElementById("loginEmail").value;
let password = document.getElementById("loginPassword").value;

let storedPlayer = JSON.parse(localStorage.getItem("player"));

if(storedPlayer && email === storedPlayer.email && password === storedPlayer.password){

alert("Login Successful!");

window.location.href = "profile.html";

}else{

alert("Invalid Email or Password");

}

});

}
const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", function(e){

e.preventDefault();

let email = document.getElementById("email").value;
let password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let validUser = users.find(user => user.email === email && user.password === password);

if(validUser){

localStorage.setItem("loggedInUser", JSON.stringify(validUser));

alert("Login Successful!");

window.location.href = "profile.html";

}else{

alert("Invalid Email or Password");

}

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
// Tournament Registration System

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
