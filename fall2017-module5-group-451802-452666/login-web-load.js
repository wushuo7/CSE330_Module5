function loginwebload() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "login-web-load.php", true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.addEventListener("load", loginwebloadcallBack,false);
        xmlHttp.send(null);
}

function loginwebloadcallBack(event) {
        var jsonData = JSON.parse(event.target.responseText);
        if(jsonData.success === true){
                alert(jsonData.why);
                show_event();
                document.getElementById("register").style.display="none";
                document.getElementById("login").style.display="none";
                var word = document.getElementById("hello1");
                word.innerHTML = "<strong>" +"Hello : "+jsonData.username+"."+"</strong>" ;
                var logout1 = document.getElementById("logout");
                logout1.style.display="inline";
                token = jsonData.token;
                var new_event_displace = document.getElementById("edit_event");
                new_event_displace.style.display="inline";
                
        }
        else{
                show_event();
                alert(jsonData.why);
        }
        
}
document.addEventListener("DOMContentLoaded", loginwebload, false);