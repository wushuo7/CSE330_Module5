function register() {
        var username = document.getElementById("new_username").value;
        var password = document.getElementById("new_password").value;
        var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "register.php", true);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.addEventListener("load", RcallBack,false);
        xmlHttp.send(dataString);
        document.getElementById("new_username").value="";
        document.getElementById("new_password").value="";
}

function RcallBack(event) {
        var jsonData = JSON.parse(event.target.responseText);
        if(jsonData.success === true){
                alert(jsonData.why);
                document.getElementById("register").style.display="none";
                
                
                
        }
        else{
                alert(jsonData.why);
        }
        
}
var el = document.getElementById("button_register");
if(el){
  el.addEventListener("click", register, false);
}
