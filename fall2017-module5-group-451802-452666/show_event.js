        
        function show_event(){
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.open("POST", "show_event.php", true);
                xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xmlHttp.addEventListener("load", displayCallback,false);
                //dataString = "token="+encodeURIComponent(token);
                xmlHttp.send(null);
                document.getElementById("username").value="";
                document.getElementById("password").value="";
        }
        function displayCallback(event){
                var jsonData = JSON.parse(event.target.responseText);
                if (jsonData.success === true) {
                    var weeks = currentMonth.getWeeks();
                    var day_of_themonth = [];
                    var p=0;
                    for(var ws in weeks){
                        var all_days = weeks[ws].getDates();
                        for(var g in all_days){ 
                            day_of_themonth[p] = all_days[g];
                            p++;
                        }
                    }
        
                    for (var q =0; q<jsonData.Name_event.length; q++) {
                        var minutes=jsonData.Minute_event[q];
                        if (jsonData.Minute_event[q]<10) {
                            minutes = "0"+jsonData.Minute_event[q];
                        }
                        for(var n=0;n<day_of_themonth.length;n++){
                            
                        if(jsonData.Year_event[q] ===day_of_themonth[n].getFullYear()){
                            if((jsonData.Month_event[q]-1) ===day_of_themonth[n].getMonth()){
                                if(jsonData.Day_event[q] ===day_of_themonth[n].getDate()){
                                    var l=n+1;
                                    document.getElementById("day"+l).innerHTML+="<br>"+"Event Name:"+"<br>"+jsonData.Name_event[q]+"<br>"+ "Time " + jsonData.Hour_event[q]+":"+minutes+"<br>";
                                    if(show === true){
                                        document.getElementById("day"+l).innerHTML+=" Category: "+jsonData.Category_event[q];
                                    }
                                    else{
                                        
                                    }
                                }
                        }}}
                    }
                     
                }else{
                    var Month_in_english=["January","February","March","April","May","June","July","August","September","October","November","December"];
                var weeks = currentMonth.getWeeks();
                
				Month_Name = Month_in_english[currentMonth.month];
                document.getElementById("currentmonth").innerHTML = Month_Name+" " + currentYear;
                var numberforday=0;
                var day = [];
				if (weeks.length === 5) {
                    document.getElementById("additional").style.display = "none";
                }
                if (weeks.length ===6) {
                    document.getElementById("additional").style.display = "";
                }
                for(var w in weeks){
                    var days = weeks[w].getDates();
                    for(var d in days){ 
                        day[numberforday] = days[d].getDate();
                        numberforday = numberforday+1;
                    }
                }
				var index1;
				var index2;
				for(var i=1;i<=42;i++){
					if(day[i-1] === 1){
						index1 = i-1;
						break;
					}
				}
				for(var j=1;j<=42;j++){
					if(day[j-1] === 1){
						index2 = j-1;
						
					}
				}
				if(index1 ===index2){
					index2 =35;
				}
				for(var s=1;s<=index1+1;s++){
					document.getElementById("day"+s).innerHTML="";
				}
				for(var k=index1+1;k<=index2+1;k++){
					if(day[k-1] === 1){
						document.getElementById("day"+k).innerHTML=Month_Name+" "+day[k-1];
						k++;
					}
                document.getElementById("day"+k).innerHTML=day[k-1];
                
				}
				for(var l=index2+1;l<=42;l++){
					document.getElementById("day"+l).innerHTML="";
				}
                }
                alert(jsonData.why);
            }
         