$(document).ready(function() {
  getCurPosition();
  var lat, lon;
  var background = "";

  //  Locate user's current position
  function getCurPosition() {
    if (navigator.geolocation) {
     cache: false; navigator.geolocation.getCurrentPosition(function(position) {
        lat = Math.round(position.coords.latitude);
        lon = Math.round(position.coords.longitude);
        getServerData(lat, lon);
      });
    } else {
      alert("GPS location is not available at this time.");
    }

    // retrieve API info
    function getServerData(lat, lon) {
      var api =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lat +
        "&lon=" +
        lon;
      $.getJSON(api, function(json) {
        var tempC = Math.round(json.main.temp);
        var tempF = Math.round(tempC * 1.8 + 32);
        // display ouput
        var displayTempF = $("#tempF").text(tempF + "°F");
        var displayTempC = $("#tempC").text(tempC + "°C").hide();
        // alternate between fahrenheit and celsius with a button click
        $("a").click(function() {
          $("#tempF").toggle();
          $("#tempC").toggle();
        });
        $("#location").text(json.name + ", " + json.sys.country);
        $("#description").text(json.weather[0].description);
        $("<img>").attr("src", json.weather[0].icon).appendTo("#icon");
        // change background image based on data returned from api
        var background = json.weather[0].id;
        if (background >= 200 && background <= 232) {
            $("body").css(
            "background-image",
            "url('https://source.unsplash.com/E-Zuyev2XWo')"
          );
        } else if (background >= 300 && background <= 321) {
            $("body").css(
              "background-image",
              "url('https://source.unsplash.com/f1ng3TrWcog')"
            );
        } else if (background >= 500 && background <= 531) {
            $("body").css(
              "background-image",
              "url('https://source.unsplash.com/v3UZKbMaTGk')"
            );
        } else if (background >= 600 && background <= 622) {
            $("body").css(
              "background-image",
             "url('https://source.unsplash.com/67t2GJcD5PI')"
            );
        } else if (background >= 701 && background <= 781) {
            $("body").css(
              "background-image", 
              "url('https://source.unsplash.com/UpRoC4NCWPs')"
            ); 
        } else if (background === 800) {
            $("body").css(
              "background-image",
              "url('https://source.unsplash.com/6FAsuZdEIP0')"
            );
        } else if (background >= 801 && background <= 804) {
            $("body").css(
              "background-image",
              "url('https://source.unsplash.com/f19Pxh_96CA')"
            );
        } else if (background >= 900 && background <= 906) {
            $("body").css(
              "background-image",
              "url('https://source.unsplash.com/Kb-Q3ZxfzsQ')"
            );
        } else if (background >= 951 && background <= 962) {
            $("body").css(
              "background-image",
            "url('https://source.unsplash.com/kmF_Aq8gkp0')"
            );
        } else {
            $("body").css(
              "background",
              "gray");
        }
      });
    }
  }

  // retrieve user's current time and date
  function updateTime() {
  var currentTime = $("#currentTime").html(
   moment().format('MMMM Do YYYY, h:mm a')
  );
  }
  
  updateTime();
setInterval(function(){
   updateTime();
},60000);
});
