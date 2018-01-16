        function input_legal(event,year,month,day,hour,minute){
            if(event === ""){
                alert("name the event");
                return false;
            }
            if(month ==="4"|| month ==="6"){
                if(day<= 0 || day >30){
                    alert("enter the right day for this month");
                    return false;
                }
            }
            if(month ==="9"){
                if(day<= 0 || day >30){
                    alert("enter the right day for Sep");
                    return false;
                }
            }
            if(month ==="11"){
                if(day<= 0 || day >30){
                    alert("enter the right day for Nov");
                    return false;
                }
            }
            if(month === "2"){
                if(day<=0 || day>28){
                    alert("enter the right day for February");
                    return false;
                }
                
            }
            if ((year<2016)||(year>2018)) {
                    alert("Enter right year");
                    return false;
                }
            if ((month<0)||(month>12)) {
                    alert("Enter right month");
                    return false;
                }
            if ((day<0)||(day>31)) {
                    alert("Enter right day");
                    return false;
                }
            if ((minute<0)||(minute>59)) {
                    alert("Enter right minute");
                    return false;
                }
            if ((hour<0)||(hour>23)) {
                    alert("Enter right hour");
                    return false;
                }
            return true;
        }
        function new_event(){
            var event_name = document.getElementById("event_name").value;
            var event_year = document.getElementById("event_year").value;
            var event_month = document.getElementById("event_month").value;
            var event_day = document.getElementById("event_day").value;
            var event_hour = document.getElementById("event_hour").value;
            var event_minute = document.getElementById("event_minute").value;
            var category = document.getElementById("category").value;
            var event_share = document.getElementById("event_share").value;
            if(input_legal(event_name,event_year,event_month,event_day,event_hour,event_minute)){
                var xmlHttp = new XMLHttpRequest();
                var dataString= "event_name="+encodeURIComponent(event_name)+
                                "&event_year="+encodeURIComponent(event_year)+
                                "&event_month="+encodeURIComponent(event_month)+
                                "&event_day="+encodeURIComponent(event_day)+
                                "&event_hour="+encodeURIComponent(event_hour)+
                                "&event_minute="+encodeURIComponent(event_minute)+
                                "&category="+encodeURIComponent(category)+
                                "&token="+encodeURIComponent(token)+
                                "&event_share="+encodeURIComponent(event_share);
                xmlHttp.open("POST", "new_event.php", true);
                xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xmlHttp.addEventListener("load", neweventcallBack,false);
                xmlHttp.send(dataString);
                document.getElementById("username").value="";
                document.getElementById("password").value="";
                updateCalendar();
                
            }
            else{
                document.getElementById("event_name").value="";
                document.getElementById("event_year").value=2017;
                document.getElementById("event_month").value=1;
                document.getElementById("event_day").value=1;
                document.getElementById("event_hour").value=0;
                document.getElementById("event_minute").value=0;
                document.getElementById("category").value="commercial";
                document.getElementById("event_share").value="";
                updateCalendar();
                
            }
        
            
        }
        function neweventcallBack(event){
            var jsonData = JSON.parse(event.target.responseText);
            if(jsonData.success === true){
                show_event();
                document.getElementById("event_name").value="";
                document.getElementById("event_year").value=2017;
                document.getElementById("event_month").value=1;
                document.getElementById("event_day").value=1;
                document.getElementById("event_hour").value=0;
                document.getElementById("event_minute").value=0;
                document.getElementById("category").value="commercial";
                document.getElementById("event_share").value="";
                alert(jsonData.why);
            }
            else{
                alert(jsonData.why);
                show_event();
                document.getElementById("event_name").value="";
                document.getElementById("event_year").value=2017;
                document.getElementById("event_month").value=1;
                document.getElementById("event_day").value=1;
                document.getElementById("event_hour").value=0;
                document.getElementById("event_minute").value=0;
                document.getElementById("category").value="commercial";
                document.getElementById("event_share").value="";
            }
        }
        document.getElementById("new_event").addEventListener("click", new_event, false);