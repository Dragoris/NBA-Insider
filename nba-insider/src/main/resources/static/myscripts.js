let globalJsonObject = {}

let teamState = {
  state:'',
  "teamOne": {
  },
  "teamTwo": {
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

function choosePlayerButton(buttonID) {
  teamState.state=buttonID
  console.log("state=", teamState.state)
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
  let playerList = ''
  let team = Object.keys(globalJsonObject[`${id}`])
  let team1 = document.getElementById("team-1-dropdown"); //used to remove from the dom
  let team2 = document.getElementById("team-2-dropdown"); // need to find a cleaner way...
  team.forEach(player => {
    if (player != "Logo"){
      let playerID = globalJsonObject[`${id}`][`${player}`]
      let photo = playerID.Pic
      let name = playerID.Name
      
      let img = `<img src="https://www.basketball-reference.com/req/202106291/images/players/${photo}.jpg" class="player-photo">`
      playerList += `<div onclick="selectedPlayers(this.id)" class="player-cards" id="${name}", title="${name}, ${id}">${img}<div class="player-info"><p>Name: ${name}</p><p>Salary: ${playerID.Salary}</p></div></div>`
    }

  });
  
  team1.classList.remove("show") //used to remove from the dom
  team2.classList.remove("show") // need to find a cleaner way...
  document.getElementById("player-dropdown").innerHTML = playerList
  document.getElementById("player-dropdown").classList.toggle("show-players");
  
}

function reset() {
  document.getElementById(`team-1-dropdown`).innerHTML =''
  document.getElementById(`team-2-dropdown`).innerHTML =''
  document.getElementById("player-dropdown").innerHTML =''
}

function selectedPlayers(title, id){
  let a = document.getElementsByClassName("player-cards")
  console.log(title, id)
}
//ideas for menu: desktop keep team logos on side as you select players

//on phone when you select a team players pop up and teams icons disapear. click team button starts over, back to team button locked at top of toggle. 
//flex box a few rows