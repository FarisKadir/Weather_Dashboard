$(document).ready(function()    {
    var key = "60e01cf8819d6fe551736d0879242403";
    var coord = [];
    

    //Function for retrieving the latitude and longitude
    function getForecast(city) {
        var forecastURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        $.ajax({
            url: forecastURL,
            method: "GET"
        }) .then(function(response) {
            var oneCallURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + key;
            var country = response.sys.country;
            $.ajax({
                url: oneCallURL,
                method: "GET"
            }) .then(function(response) {
                    temp = response.current.temp;
                    humidity = response.current.humidity;
                    wind = response.current.wind_speed;
                    uvInd = response.current.uvi;
                    $("#citydate").text(city.charAt(0).toUpperCase() + city.slice(1) + ", " + country + "  (" + moment().format("MM/DD/YYYY") + ")");
                    $("#temp").text("Temperature: " + temp.toString() + " F");
                    $("#humidity").text("Humidity: " + humidity.toString());
                    $("#wind").text("Wind: " + wind.toString());
                    $("#uv").text("UV Index: " + uvInd); 
            })
        });
    };


    $(".searchBtn").on("click", function()  {
        getForecast($("#search").val());
    });




}); //End of document ready   