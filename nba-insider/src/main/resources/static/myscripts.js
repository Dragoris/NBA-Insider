function secondPage() {
  jason('GET', '/nba')
  document.getElementById("page-1").classList.add("hidden")
  document.getElementById("page-2").classList.remove("hidden")
  
}
function teamButton(){
  alert('hellothere!')
  document.getElementById("myDropdown").classList.toggle("show");
}

function reqListener () {
  const response = JSON.parse(this.responseText, null, 2);
  return response

}

function jason(method, url){
  let get = new XMLHttpRequest();
  get.addEventListener("load", reqListener);
  get.open(method, url);
  get.send();
}



function playerTog(){
  obj = reqListener
  
}
