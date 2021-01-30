$(document).ready(function()    {



    $(".searchBtn").on("click", function()  {
        var city = $("#search").val();
        var key = $("#key").val();
        
        queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        
        //API Call
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              
              var temp = ((response.main.temp - 273.15) * 9/5 +32).toFixed(2);
              
              var city = response.name;

              var country = response.sys.country;
              
              var humidity = response.main.humidity;

              var wind = response.wind.speed;

              var uvInd = response.
              

            $("#citydate").text(city.toString() + ", " + country + "  (" + moment().format("MM/DD/YYYY") + ")");
            $("#temp").text("Temperature: " + temp.toString() + " F");
            $("#humidity").text("Humidity: " + humidity.toString());
            $("#wind").text("Wind: " + wind.toString());
            $("#uv").text("UV Index: ");
        });
    });



}) //End of document ready   