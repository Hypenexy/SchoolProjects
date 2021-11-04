var firstshiftbtn = document.getElementById("firstshiftbtn");
var secondshiftbtn = document.getElementById("secondshiftbtn");
var firstshift = document.getElementById("firstshift");
var secondshift = document.getElementById("secondshift");

var optionsbtn = document.getElementById("optionsbtn");

function openTime(time){
    if(time==1){
        firstshiftbtn.style.border = "1px solid #000"
        firstshiftbtn.style.color = "#000"
        firstshift.style.display = "block";
        secondshiftbtn.style.removeProperty("border");
        secondshiftbtn.style.removeProperty("color");
        secondshift.style.removeProperty("display");
    }
    else{
        secondshiftbtn.style.border = "1px solid #000"
        secondshiftbtn.style.color = "#000"
        secondshift.style.display = "block";
        firstshiftbtn.style.removeProperty("border");
        firstshiftbtn.style.removeProperty("color");
        firstshift.style.removeProperty("display");
    }
    localStorage.setItem("schooltime", time)
}

firstshiftbtn.onclick = function(){
    openTime(1);
}
secondshiftbtn.onclick = function(){
    openTime(2);
}

if(localStorage.getItem("schooltime")){
    openTime(localStorage.getItem("schooltime"));
}
else{
    openTime(1)
}

function hideAll(){
    document.getElementById("modal").style.removeProperty("display");
    document.getElementById("modal").style.transition = "width 1.2s, opacity 0.6s";
    document.getElementById("modal").style.opacity = 0;
    document.getElementById("modal").style.width = "0px";
    document.getElementById("optionsbtn").style.removeProperty("color");
    document.getElementById("optionsbtn").style.removeProperty("border");
}

function openMenu(menu){
    hideAll();
    document.getElementById("modal").style.removeProperty("transition");
    document.getElementById("modal").style.opacity = 1;
    document.getElementById("modal").style.width = "800px";
    document.getElementById(menu).style.display = "block";
    if(menu=="panelsettings"){
        document.getElementById("optionsbtn").style.color = "#000";
        document.getElementById("optionsbtn").style.border = "1px solid #000";
    }
}

optionsbtn.onclick = function(){
    openMenu("panelsettings");
}

window.onclick = function (event) {
    if (event.target == modal) {
        hideAll();
    }
}