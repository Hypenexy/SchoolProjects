var firstshiftbtn = document.getElementById("firstshiftbtn");
var secondshiftbtn = document.getElementById("secondshiftbtn");
var firstshift = document.getElementById("firstshift");
var secondshift = document.getElementById("secondshift");

var optionsbtn = document.getElementById("optionsbtn");
var classroombtn = document.getElementById("classroombtn");
var linkoption = document.getElementById("linkoption");
var authoption = document.getElementById("authoption");
var cleardata = document.getElementById("cleardata");
var dayoption = document.getElementById("dayoption");

var clock = document.getElementById("clock");

var openLinkInNew;
var auth;
var onlyday;
const days = ["mon", "tue", "wed", "thu", "fri"]
const getday = new Date();
var day = getday.getDay();

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
    if(document.getElementById("modal").style.width == "800px"){
        hideAll();
    }
    else{
        openMenu("panelsettings");
    }
}

classroombtn.onclick = function(){
    var url = "https://classroom.google.com";
    if(auth!=0&&auth!=null){
        url = url + "/u/" + auth + "/h";
    }
    if(openLinkInNew){
        open(url)
    }
    else{
        open(url, "_self");
    }
}

linkoption.onchange = function(){
    if(linkoption.checked){
        openLinkInNew = true;
    }
    else{
        openLinkInNew = false;
    }
    localStorage.setItem("openNew", openLinkInNew)
}

authoption.onchange = function(){
    var value = authoption.value;
    if(value != 0){
        auth = value;
        localStorage.setItem("auth", value)
    }
    else{
        auth = 0;
        localStorage.removeItem("auth")
    }
}

dayoption.onchange = function(){
    var value = dayoption.checked;
    onlyday = value;
    localStorage.setItem("onlyday", value)
    ShowDay()
}

if(localStorage.getItem("schooltime")){
    openTime(localStorage.getItem("schooltime"));
}
else{
    openTime(1)
}

if(localStorage.getItem("openNew")){
    if(localStorage.getItem("openNew")=="false"){
        linkoption.checked = false;
        openLinkInNew = false;
    }
    else{
        linkoption.checked = true;
        openLinkInNew = true;
    }
}

if(localStorage.getItem("auth")){
    auth = localStorage.getItem("auth");
    authoption.value = auth;
}

if(localStorage.getItem("onlyday")){
    if(localStorage.getItem("onlyday")=="false"){
        dayoption.checked = false;
        onlyday = false;
    }
    else{
        dayoption.checked = true;
        onlyday = true;
    }
    ShowDay()
}


function ShowDay(){
    if(dayoption.checked==true){
        for (const n of days) { 
          document.getElementById(n).style.display = "none";
        }
        console.log(day)
        if(day==1){
            document.getElementById("mon").style.display = "block";
        }
        if(day==2){
            document.getElementById("tue").style.display = "block";
        }
        if(day==3){
            document.getElementById("wed").style.display = "block";
        }
        if(day==4){
            document.getElementById("thu").style.display = "block";
        }
        if(day==5){
            document.getElementById("fri").style.display = "block";
        }
        if(day==6||day==0){
            document.getElementById("mon").style.display = "block";
        }
    }
    else{
        for (const n of days) { 
          document.getElementById(n).style.removeProperty("display");
        }
    }
}

cleardata.onclick = function(){
    localStorage.clear();
    dayoption.checked = false;
    onlyday = false;
    authoption.value = 0;
    auth = 0;
    openLinkInNew = false;
    linkoption.checked = false;
    openTime(1);
    cleardata.innerHTML = "Success";
    setTimeout(() => {cleardata.innerHTML = "Clear all settings"}, 1000);
}

function openMeet(code){
    code = "https://meet.google.com/" + code;
    if(auth!=0&&auth!=null){
        code = code + "?authuser=" + auth;
    }
    if(openLinkInNew){
        open(code)
    }
    else{
        open(code, "_self");
    }
}

function UpdateClock(){
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    if(m<10){ m = "0" + m}
    clock.innerHTML = h + ":" + m;
    setTimeout(UpdateClock, 2000);
}

UpdateClock();