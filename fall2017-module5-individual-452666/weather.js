function fetchWeather() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://classes.engineering.wustl.edu/cse330/content/weather_json.php", false);
        xmlHttp.addEventListener("load", callBack,false);
        xmlHttp.send(null);
}

function callBack(event) {
        var jsonData = JSON.parse(event.target.responseText);
        var city = jsonData.location.city;
        var state = jsonData.location.state;
        var location = document.getElementsByClassName("weather-loc")[0];
        
        location.innerHTML = "<strong>" + city + "</strong> " + state;
        
        var realhumidity = jsonData.atmosphere.humidity;
        var humidity = document.getElementsByClassName("weather-humidity")[0];
        
        humidity.innerHTML = realhumidity;
        
        var realtemp = jsonData.current.temp;
        var temp = document.getElementsByClassName("weather-temp")[0];
        temp.innerHTML = realtemp;
        var tomorrow = document.getElementsByClassName("weather-tomorrow")[0];
        var dayafter = document.getElementsByClassName("weather-dayaftertomorrow")[0];
        tomorrow.src = "http://us.yimg.com/i/us/nws/weather/gr/" + jsonData.tomorrow.code + "ds.png";
        dayafter.src = "http://us.yimg.com/i/us/nws/weather/gr/" + jsonData.dayafter.code + "ds.png";
}

document.addEventListener("DOMContentLoaded", fetchWeather, false);
document.getElementById("update").addEventListener("click", fetchWeather, false);