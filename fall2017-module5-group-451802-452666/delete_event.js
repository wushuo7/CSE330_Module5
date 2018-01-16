        function delete_event(){
            var event_name_delete = document.getElementById("event_name_delete").value;
            var xmlHttp = new XMLHttpRequest();
            var dataString= "event_name_delete="+encodeURIComponent(event_name_delete)+
                            "&token="+encodeURIComponent(token);
                xmlHttp.open("POST", "delete_event.php", true);
                xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xmlHttp.addEventListener("load", deleteeventcallBack,false);
                xmlHttp.send(dataString);
                document.getElementById("event_name_delete").value="";
            
        
            
        }
        function deleteeventcallBack(event){
            var jsonData = JSON.parse(event.target.responseText);
            if(jsonData.success === true){
                document.getElementById("event_name_delete").value="";
                updateCalendar();
                show_event();
                alert(jsonData.why);
            }
            else{
                alert(jsonData.why);
                document.getElementById("event_name_delete").value="";
                updateCalendar();
                show_event();
                
            }
        }
        document.getElementById("delete_event").addEventListener("click", delete_event, false);