            var currentMonth = new Month(2017, 9);//global varible
			var currentYear = 2017;
			var Month_Name;
            function next_month(){
                currentMonth = currentMonth.nextMonth(); 
                updateCalendar();
                show_event();
                alert("The new month is "+Month_Name+" "+currentMonth.year);
            }
 
            function last_month(){
                currentMonth = currentMonth.prevMonth(); 
                updateCalendar();
                show_event();
                alert("The new month is "+Month_Name+" "+currentMonth.year);
            }
			
            function updateCalendar(){
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
			
            
document.addEventListener("DOMContentLoaded", updateCalendar, false);			
document.getElementById("next_month").addEventListener("click", next_month,false);
document.getElementById("last_month").addEventListener("click", last_month,false);
			