$(document).ready(function()    {
    var key = "60e01cf8819d6fe551736d0879242403";
    var history = [];
    var ul = $(".list-group");
    

    //Function to get retrieve, store, and display recent search history
    function storeHistory(city)    {
        $(".list-group").empty();
        existHist = JSON.parse(localStorage.getItem("Search History"));
        if (existHist == null) {
            history.push(city);
            localStorage.setItem("Search History", JSON.stringify(history));
        }
        else if (existHist.length < 8)   {
            history.push(city);
            localStorage.setItem("Search History", JSON.stringify(history));
        }
        else    {
            history.splice(0,1);
            history.push(city);
            localStorage.setItem("Search History", JSON.stringify(history));
        }
            console.log(history);
            history.forEach(function(item)   {
                var li = $("<li>");
                var btn = $("<button>");
                li.addClass("card");
                btn.addClass("btn btn-outline-dark text-left hist");
                btn.attr("id", item);
                btn.attr("value", item);
                btn.text(item);
                li.append(btn);
                ul.prepend(li);
            })
    };
    

    //Function for retrieving the latitude and longitude
    function getForecast(city) {
        //Calls the weather api endpoint. This is only used to retrieve the lat, lon, and country.
        var forecastURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        $.ajax({
            url: forecastURL,
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
                    $("#citydate").text(city + ", " + country + "  (" + moment().format("MM/DD/YYYY") + ")");
                    $("#temp").text("Temperature: " + temp.toString() + " F");
                    $("#humidity").text("Humidity: " + humidity.toString());
                    $("#wind").text("Wind: " + wind.toString());
                    $("#uv").text("UV Index: " + uvInd);
            })
        });
    };


    $(".searchBtn").on("click", function()  {
        console.log("I clicked the search button");
        city = $("#search").val();
        city = city.charAt(0).toUpperCase() + city.toLowerCase().slice(1);
        getForecast(city);
        storeHistory(city);
    });

    $(".hist").on("click", function()   {
        console.log("I clicked history");
        city = $(this).html();
        city = city.charAt(0).toUpperCase() + city.toLowerCase().slice(1);
        getForecast(city);
        storeHistory(city);
    });
    






}); //End of document ready   