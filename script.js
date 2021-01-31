$(document).ready(function()    {

    //retrieves any local stored searches 
    var history = JSON.parse(localStorage.getItem("Search History"));


    var key = "60e01cf8819d6fe551736d0879242403";
    var ul = $(".list-group");
    
    

    //Create buttons for history
    function btnCreate(arr) {
        $(".list-group").empty();
        
        arr.forEach(function(item)   {
            var li = $("<li>");
            var btn = $("<button>");
            li.addClass("card");
            btn.addClass("btn btn-outline-dark text-left");
            btn.attr("onclick","clickWeather('" + item + "')");
            btn.text(item);
            li.append(btn);
            ul.prepend(li);
        })
    }


    //Store history
    function storeHistory(city)    {
    
        if (history == null) {
            history = [];
            history.push(city);
            localStorage.setItem("Search History", JSON.stringify(history));
            btnCreate(history);
        }
        else if (history.length < 8)   {
            history.push(city);
            localStorage.setItem("Search History", JSON.stringify(history));
            btnCreate(history);
        }
        else    {
            history.splice(0,1);
            history.push(city);
            localStorage.setItem("Search History", JSON.stringify(history));
            btnCreate(history);
        };

        history = JSON.parse(localStorage.getItem("Search History"));
        return history;
    };


     //Function for retrieving the latitude and longitude
    function weather(city) {
        //Calls the weather api endpoint. This is only used to retrieve the lat, lon, and country.
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        $.ajax({
            url: weatherURL,
            method: "GET"
        }) .then(function(response) {
            var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&units=imperial&appid=" + key;
            var country = response.sys.country;
            //Calls the OneCall endpoint to retrieve all of the current weather and 5 day
            $.ajax({
                url: oneCallURL,
                method: "GET"
            }) .then(function(response) {
                    temp = response.current.temp;
                    humidity = response.current.humidity;
                    wind = response.current.wind_speed;
                    uvInd = response.current.uvi;
                    iconURL = "https://openweathermap.org/img/wn/" + response.current.weather[0].icon + "@2x.png";
                    var img = $("<img>");
                    img.attr({src: iconURL, alt: response.current.weather[0].description});
                    
                    $("#city").text(city + ", " + country + "  (" + moment().format("MM/DD/YYYY") + ")");
                    $("#city").append(img);
                    $("#currentIcon").attr("src", iconURL);
                    $("#temp").text("Temperature: " + temp.toString() + " F");
                    $("#humidity").text("Humidity: " + humidity.toString() + "%");
                    $("#wind").text("Wind Speed: " + wind.toString() + " MPH");
                    $("#uv").text( uvInd);
                    $("#uv").attr("display", "inline-block");
                    
                    if (uvInd >= 0 && uvInd < 3) {
                        $("#uv").addClass("bg-success p-1");
                    }
                    else if (uvInd >= 3 && uvInd <=7 )  {
                        $("#uv").addClass("bg-warning p-1");
                    }
                    else{
                        $("#uv").addClass("bg-dange p-1");
                    };
            })
        });
    };

    //Function for the 5 day forecast
    function forecast(city) {
        var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        $.ajax({
            url: weatherURL,
            method: "GET"
        }) .then(function(response) {
                var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + key;
                var country = response.sys.country;
                    //Calls the OneCall endpoint to retrieve all of the current weather and 5 day
                    $.ajax({
                        url: oneCallURL,
                        method: "GET"
                    }) .then(function(response) {
                            forArr = response.daily;
                            $(".forecast").empty();
                            //Creates the cards that contain the date, weather condition icon, temp, and humidity for the next 5 days
                            for (var i = 0; i < 5; i++) {
                                var ms = forArr[i].dt * 1000;
                                var dt = new Date(ms);
                                var dateObj = dt.toLocaleString("en-US", {dateStyle: "short"});
                                iconURL = "https://openweathermap.org/img/wn/" + forArr[i].weather[0].icon + "@2x.png";                       
                                var temp = forArr[i].temp.day;
                                var humidity = forArr[i].humidity;
                                var div = $("<div>");
                                var span = $("<span>");
                                var h = $("<h2>");
                                var p = $("<p>");
                                var img = $("<img>");
                                div.addClass("card w-25");
                                span.addClass("card-body bg-primary text-white");
                                h.addClass("card-title");
                                h.text(dateObj);
                                p.addClass("card-text");
                                p.text("Temp: " + temp + " F" + "\nHumidity: " + humidity);
                                img.attr("src", iconURL);
                                $(".forecast").append(div);
                                div.append(span);
                                span.append(h, img, p);
                            }
                    });
        });
    }

    
//creates buttons for any searches that existed.
   btnCreate(history);

    //On click event for when the search button is clicked.
    $(".searchBtn").on("click", function()  {
        city = $("#search").val();
        city = city.charAt(0).toUpperCase() + city.toLowerCase().slice(1);
        weather(city);
        storeHistory(city);
        forecast(city);
    });



}); //End of document ready 