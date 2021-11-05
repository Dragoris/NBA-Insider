let globalJsonObject = {}

let teamState = {
  state:'',
  "teamOne": {
    franchise:'',
    picks:[]
  },
  "teamTwo": {
    franchise:'',
    picks:[]

  },
}

function secondPage() {
  jason('GET', '/nba')
  document.getElementById("page-1").classList.add("hidden")
  document.getElementById("page-2").classList.remove("hidden")
  
}

function reqListener() { //parsing jason and saving in global verable
  globalJsonObject = JSON.parse(this.responseText);

}

function jason(method, url) {
  let get = new XMLHttpRequest();
  get.addEventListener("load", reqListener);
  get.open(method, url);
  get.send();
}

function chooseTeamButton(buttonID) {
  
  teamState.state=buttonID
  document.getElementById(teamState.state).src = 'png/bball.svg';
  let toggle = ''
  teamNames = Object.keys(globalJsonObject).sort()
  teamNames.forEach(team => {
    let img = `<img class="team-logo" id="${team}" onClick="teamPlayers(this.id)"  src="https://d2p3bygnnzw9w3.cloudfront.net/req/202106153/tlogo/bbr/${team}-2021.png" alt=${team} team Logo" />`
    toggle += `<li title="${team}">${img}</li>`
  });
  document.getElementById(`${buttonID}-dropdown`).innerHTML = toggle
  document.getElementById(`${buttonID}-dropdown`).classList.toggle("show");
  
}

function teamPlayers(id) {
  teamState.state == "teamOne" ? teamState.teamOne.franchise = id : teamState.teamTwo.franchise = id;
  document.getElementById(teamState.state).src = `https://d2p3bygnnzw9w3.cloudfront.net/req/202106153/tlogo/bbr/${id}-2021.png`;
  resetPicks(teamState.state)

  let playerList = '';
  const team = Object.keys(globalJsonObject[`${id}`]);
  const team1 = document.getElementById("teamOne-dropdown"); //used to remove from the dom
  const team2 = document.getElementById("teamTwo-dropdown"); // need to find a cleaner way...
  team.forEach(player => {
    if (player != "Logo"){
      const playerID = globalJsonObject[`${id}`][`${player}`];
      const photo = playerID.Pic;
      const name = playerID.Name;
      const img = `<img src="https://www.basketball-reference.com/req/202106291/images/players/${photo}.jpg" class="player-photo">`;
      playerList += `<div onclick="selectedPlayers(this.id)" class="player-cards" id="${name}", title="${name}, ${id}">${img}<div class="player-info"><p>Name: ${name}</p><p>Salary: ${playerID.Salary}</p></div></div>`;

    }
  });

  team1.classList.remove("show"); //used to remove from the dom
  team2.classList.remove("show"); // need to find a cleaner way...
  document.getElementById("player-dropdown").innerHTML = playerList;
  document.getElementById("player-dropdown").classList.toggle("show-players");
  
}

function resetPicks (teamReset) {
  teamState[teamReset].picks = [];

}

function resetDom() {
  document.getElementById(`teamOne-dropdown`).innerHTML ='';
  document.getElementById(`teamTwo-dropdown`).innerHTML ='';
  document.getElementById("player-dropdown").innerHTML ='';
  document.getElementById('teamOne').src = 'png/bball.svg';
  document.getElementById('teamTwo').src = 'png/bball.svg';
}
//reset 
function reset() { 
  resetDom();
  resetPicks('teamOne');
  resetPicks('teamTwo');

}

//add players if they have been selected but remove if they were
function selectedPlayers (name) {
  const whichTeam = teamState.state;
  const isPlayerOnTeam = teamState[whichTeam].picks.includes(name);
  if (isPlayerOnTeam) {teamState[whichTeam].picks = teamState[whichTeam].picks.filter(player => player !== name)} 
  else {teamState[whichTeam].picks.push(name)} 

}
//ideas for menu: desktop keep team logos on side as you select players

//on phone when you select a team players pop up and teams icons disapear. click team button starts over, back to team button locked at top of toggle. 
//flex box a few rows