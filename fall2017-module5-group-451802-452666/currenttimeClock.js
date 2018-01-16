function currenttimeClock(){
        var currentMonth = new Month(2017, 9);//global varible
		var currentYear = 2017;
        var Month_in_english=["January","February","March","April","May","June","July","August","September","October","November","December"];
        var weeks = currentMonth.getWeeks();
        Month_Name = Month_in_english[currentMonth.month];
    // document.getElementById("currentmonth").innerHTML = Month_Name+" " + currentYear;
        var curHour=new Date().getHours();
        var curMinute=new Date().getMinutes();
        var curSecond=new Date().getSeconds();
        document.getElementById("currentmonth").innerHTML=Month_Name+" " + currentYear+" "+curHour+ ":"+curMinute+":"+curSecond;
}
var snds=1000;
setInterval("currenttimeClock()",snds);