function login() {
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "login-check.php", true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.addEventListener("load", LogincallBack,false);
        xmlHttp.send(dataString);
        document.getElementById("username").value="";
        document.getElementById("password").value="";
}

function LogincallBack(event) {
        var jsonData = JSON.parse(event.target.responseText);
        alert(jsonData.why);
        if(jsonData.success === true){
        
                
                document.getElementById("register").style.display="none";
                document.getElementById("login").style.display="none";
                var word = document.getElementById("hello1");
                word.innerHTML = "<strong>" +"Hello : "+jsonData.username+"."+"</strong>" ;
                var logout1 = document.getElementById("logout");
                logout1.style.display="inline";
                var new_event_displace = document.getElementById("edit_event");
                new_event_displace.style.display="inline";
                token = jsonData.token;
                show_event();
        }
        else{
         
        }
        
}
var el = document.getElementById("button_login");
if(el){
  el.addEventListener("click", login, false);
}
