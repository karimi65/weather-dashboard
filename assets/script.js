// This .on("click") function will trigger the AJAX Call
$("#find-city").on("click", function (event) {
  event.preventDefault();

  // grab the text from the input box
  var city = $("#city-input").val();

  var apiKey = "&apikey=5548be92d388f7fbaadf4277d9c3c68d";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    apiKey +
    "&units=imperial";
  // making ajax call
  $.ajax({
    url: queryURL,
    method: "GET",
    // once we recieve the data, do something
  }).then(function (response) {
    console.log(response);
    var reportDate = new Date(response.dt * 1000).toLocaleDateString();

    $(".city").text(response.name + " (" + reportDate + ")");
    $(".temp").text(Math.floor(response.main.temp) + "° F");
    $(".humidity").text(response.main.humidity + "%");
    $(".wind").text(Math.floor(response.wind.speed) + " mph");

    currentUvIndex(response.coord.lon, response.coord.lat);
  });
});

// get current UV index
function currentUvIndex(lon, lat) {
  var uvApiKey = "&apikey=5548be92d388f7fbaadf4277d9c3c68d";
  var uvqURL =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    uvApiKey;
  $.ajax({
    url: uvqURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var UVIndex = response.value;
    $(".uvIndex").text(UVIndex);

    //determine severity of UV Index for color coding
    var UVbg = null;
    var textColor = null;
    if (UVIndex < 2) {
      UVbg = "green";
      textColor = "white";
    } else if (UVIndex >= 2 && UVIndex < 6) {
      UVbg = "yellow";
      textColor = "black";
    } else if (UVIndex >= 6 && UVIndex < 8) {
      UVbg = "orange";
      textColor = "black";
    } else if (UVIndex >= 8 && UVIndex < 11) {
      UVbg = "red";
      textColor = "white";
    } else {
      UVbg = "violet";
      textColor = "white";
    }
    $(".uvIndex").css("backgroundColor", UVbg).css("color", textColor);
  });
}

// 5-day forecast
$("#find-city").on("click", function (event) {
  event.preventDefault();

  var city = $("#city-input").val();
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&apikey=5548be92d388f7fbaadf4277d9c3c68d" +
    "&units=imperial";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    for (var i = 0; i < 5; i++) {
      var reportDate = new Date(
        response.list[(i + 1) * 8 - 1].dt * 1000
      ).toLocaleDateString();

      $("#fDate" + i).html(reportDate);
      $("#fTemp" + i).html(
        Math.floor(response.list[(i + 1) * 8 - 1].main.temp) + "° F"
      );
      $("#fDescrip" + i).html(
        response.list[(i + 1) * 8 - 1].weather[0].description
      );
      $("#fIcon" + i).html(
        response.list[(i + 1) * 8 - 1].weather[0].icon +
          "http://openweathermap.org/img/wn/" +
          "@2x.png"
      );
      $("#fFeels" + i).html(
        Math.floor(response.list[(i + 1) * 8 - 1].main.feels_like) + "° F"
      );
      $("#fHum" + i).html(response.list[(i + 1) * 8 - 1].main.humidity + "%");
    }
  });
});
