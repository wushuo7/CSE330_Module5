function logout() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "logout.php", true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.addEventListener("load", LogoutcallBack,false);
        xmlHttp.send(null);
        document.getElementById("username").value="";
        
}

function LogoutcallBack(event) {
        var jsonData = JSON.parse(event.target.responseText);
        alert(jsonData.why);
        document.getElementById("login").style.display="";
        document.getElementById("register").style.display="";
        var word = document.getElementById("hello1");
        word.innerHTML = "" ;
        var logout1 = document.getElementById("logout");
        logout1.style.display="none";
        var new_event_displace = document.getElementById("edit_event");
        new_event_displace.style.display="none";
        updateCalendar();
        
        
        
               
        
}

var el = document.getElementById("logout");
if(el){
  el.addEventListener("click", logout, false);
}
