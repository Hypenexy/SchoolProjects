var currentslide = 0;
var maxnum = 11;
var presenting = false;
var fullscreen = false;
var documentelem = document.documentElement;
const start = document.getElementById("start");
const modal = document.getElementById("modal");
var startPresentationDate;
var endPresentationDate;
var updateTime;
var keyclicks = 0;
var clicks = 0;
var vidclicks = 0;

function openFullscreen(){
  fullscreen = true;
  if (documentelem.requestFullscreen) {
    documentelem.requestFullscreen();
  } else if (documentelem.webkitRequestFullscreen) {
    documentelem.webkitRequestFullscreen();
  } else if (documentelem.msRequestFullscreen) {
    documentelem.msRequestFullscreen();
  }
}

function closeFullscreen(){
  fullscreen = false;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function NextSlide(){
    if(presenting){
        if(currentslide>maxnum-1){
            closeFullscreen()
            ShowMenu();
            endPresentationDate = new Date();
            presenting = false;
            return;
        }
        document.getElementById(currentslide).style.display = "none";
		currentslide++;
        document.getElementById(currentslide).style.display = "block";
    }
}

function PrevSlide(){
    if(presenting){
        if(currentslide<2){
            return;
        }
        document.getElementById(currentslide).style.display = "none";
		currentslide--;
        document.getElementById(currentslide).style.display = "block";
        //document.getElementById(currentslide).play; fix this
    }
}

function StartPresentation(){
    startPresentationDate = new Date();
    start.style.display = "none";
    document.getElementById("1").style.display = "block";
	currentslide = 1;
    presenting = true;
    openFullscreen()
}

function UpdateTime(){
      var now = new Date().getTime();
      if(endPresentationDate){
        now = endPresentationDate;
        clearInterval(updateTime);
      }

      var distance = now - startPresentationDate;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      var formattedtime = "";
      if(days!=0){
        formattedtime = days + "d ";
      } 
      if(hours!=0){
        formattedtime = formattedtime + hours + "h ";
      } 
      if(minutes!=0){
        formattedtime = formattedtime + minutes + "m ";
      } 
      formattedtime = formattedtime + seconds + "s ";
      document.getElementById("timepresenting").innerHTML = formattedtime;

      if (presenting==false && endPresentationDate==null) {
        document.getElementById("timepresenting").innerHTML = "0s ;p";
        clearInterval(updateTime);
      }
}

function ShowMenu(){
    modal.style.display = "block";

    console.log(document.getElementById("1").videoHeight)
    console.log(document.getElementById("1").videoHeight)

    document.getElementById("clicks").innerHTML = clicks;
    document.getElementById("vidclicks").innerHTML = vidclicks;
    document.getElementById("keyclicks").innerHTML = keyclicks;
    document.getElementById("current").innerHTML = "Current slide: " + currentslide + " | " + maxnum;
    clearInterval(updateTime);
    UpdateTime();
    updateTime = setInterval(function() {
        UpdateTime();
    }, 1000);
}

function HideMenu(){
    modal.style.removeProperty("display");
    clearInterval(updateTime);
}

start.onclick = function() {
    StartPresentation();
}

window.onclick = function(e) {
    clicks++;
    //console.log(String(e.path[0]))
    if(String(e.path[0])=="[object HTMLVideoElement]"){
        vidclicks++;
        if(presenting){
            NextSlide();
        }
    }
    if (e.target == modal) {
        HideMenu();
    }
};

document.body.onkeyup = function(e){
    keyclicks++;
    if(e.keyCode == 32 || e.keyCode == 39 || e.keyCode == 38){
        if(presenting){
            NextSlide();
        }
    }
    if(e.keyCode == 37 || e.keyCode == 40){
        if(presenting){
            PrevSlide();
        }
    }
    if(e.keyCode == 81){
        ShowMenu();
    }
}

document.body.keydown = function(e){
    if(e.keyCode == 27){
        e.preventdefault()
        ShowMenu();
    }
}