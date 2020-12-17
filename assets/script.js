
// This .on("click") function will trigger the AJAX Call
$("#find-city").on("click", function (event) {
    event.preventDefault();

    // grab the text from the input box
    var city = $("#city-input").val();

    var apiKey = "&apikey=5548be92d388f7fbaadf4277d9c3c68d"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var reportDate = new Date(response.dt * 1000).toLocaleDateString();

        $(".city").text(("City: " + (response.name) + " (" + reportDate + ")"));
        $(".temp").text("Temp: " + (Math.floor(response.main.temp)) + '° F');
        $(".humidity").text("Humidity: " + (response.main.humidity) + "%");
        $(".wind").text("Wind Speed: " + (Math.floor(response.wind.speed)) + ' mph');;
    });

});