$(document).ready(function()    {



    $(".searchBtn").on("click", function()  {
        var city = $("#search").val();
        var key = $("#key").val();
        console.log(city);
        queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
        console.log(queryURL);
        //API Call
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response.coord.lon);
        });
    });



}) //End of document ready   