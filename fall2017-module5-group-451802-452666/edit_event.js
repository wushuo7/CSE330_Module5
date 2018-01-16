        function input_legal2(event,year,month,day,hour,minute){
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
        function edit_event(){
            var new_name = document.getElementById("event_name_edit").value;
            var new_year = document.getElementById("new_event_year").value;
            var new_month = document.getElementById("new_event_month").value;
            var new_day = document.getElementById("new_event_day").value;
            var new_hour = document.getElementById("new_event_hour").value;
            var new_minute = document.getElementById("new_event_minute").value;
            var new_category = document.getElementById("new_category").value;
            var new_share = document.getElementById("new_event_share").value;
            if(input_legal2(new_name,new_year,new_month,new_day,new_hour,new_minute)){
                var xmlHttp = new XMLHttpRequest();
                var dataString= "new_name="+encodeURIComponent(new_name)+
                                "&new_year="+encodeURIComponent(new_year)+
                                "&new_month="+encodeURIComponent(new_month)+
                                "&new_day="+encodeURIComponent(new_day)+
                                "&new_hour="+encodeURIComponent(new_hour)+
                                "&new_minute="+encodeURIComponent(new_minute)+
                                "&new_category="+encodeURIComponent(new_category)+
                                "&token="+encodeURIComponent(token)+
                                "&new_share="+encodeURIComponent(new_share);
                xmlHttp.open("POST", "edit_event.php", true);
                xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xmlHttp.addEventListener("load", editeventcallBack,false);
                xmlHttp.send(dataString);
                document.getElementById("username").value="";
                document.getElementById("password").value="";
                updateCalendar();
                
                alert(jsonData.why);
            }
            else{
                
                document.getElementById("event_name_edit").value="";
                document.getElementById("new_event_year").value=2017;
                document.getElementById("new_event_month").value=1;
                document.getElementById("new_event_day").value=1;
                document.getElementById("new_event_hour").value=0;
                document.getElementById("new_event_minute").value=0;
                document.getElementById("new_category").value="commercial";
                document.getElementById("new_event_share").value="";
                updateCalendar();
                
            }
        
            
        }
        function editeventcallBack(event){
            var jsonData = JSON.parse(event.target.responseText);
            if(jsonData.success === true){
                document.getElementById("event_name_edit").value="";
                document.getElementById("new_event_year").value=2017;
                document.getElementById("new_event_month").value=1;
                document.getElementById("new_event_day").value=1;
                document.getElementById("new_event_hour").value=0;
                document.getElementById("new_event_minute").value=0;
                document.getElementById("new_category").value="commercial";
                document.getElementById("new_event_share").value="";
                updateCalendar();
                show_event();
                alert(jsonData.why);
                
                
            }
            else{
                
                document.getElementById("event_name_edit").value="";
                document.getElementById("new_event_year").value=2017;
                document.getElementById("new_event_month").value=1;
                document.getElementById("new_event_day").value=1;
                document.getElementById("new_event_hour").value=0;
                document.getElementById("new_event_minute").value=0;
                document.getElementById("new_category").value="commercial";
                document.getElementById("new_event_share").value="";
                updateCalendar();
                show_event();
                alert(jsonData.why);
                
            }
        }
        document.getElementById("set_event").addEventListener("click", edit_event, false);