let globalJsonObject = {}

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

function choosePlayerButton(id) {
  let toggle = ''
  teamNames = Object.keys(globalJsonObject).sort()
  teamNames.forEach(team => {
    let img = `<img class="team-logo" id="${team}" onClick="teamPlayers(this.id)"  src="https://d2p3bygnnzw9w3.cloudfront.net/req/202106153/tlogo/bbr/${team}-2021.png" alt=${team} team Logo" />`
    toggle += `<li title="${team}">${img}</li>`
  });
  document.getElementById(`${id}-dropdown`).innerHTML = toggle
  document.getElementById(`${id}-dropdown`).classList.toggle("show");
   
}

function teamPlayers(id) {
  let playerList = ''
  
  team = Object.keys(globalJsonObject[`${id}`])
  team.forEach(player => {
    console.log(player)
    let photo = globalJsonObject[`${id}`][`${player}`].Pic
    if (player != "Logo"){
      let img = `<img class="player-photo' src="https://www.basketball-reference.com/req/202106291/images/players/${photo}.jpg" `
      console.log(img)
    }

  });
}
//ideas for menu: desktop keep team logos on side as you select players

//on phone when you select a team players pop up and teams icons disapear. click team button starts over, back to team button locked at top of toggle. 
//flex box a few rows 